import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPodcast } from '../interfaces/podcast.interface';
import { IEpisode } from '../interfaces/episode.interface';
import { ParserService } from './parser.service';
import {
  IAffiliate,
  IAffiliatePodcast,
} from '../interfaces/affiliate.interface';

@Injectable({
  providedIn: 'root',
})
export class PodcastService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private parserService = inject(ParserService);

  public podcasts = signal<IPodcast[]>([]);
  public episodes = signal<IEpisode[]>([]);
  public affiliates = signal<IAffiliate[]>([]);

  public fetchPodcasts() {
    this.http.get(this.apiUrl + '/rest/podcasts').subscribe((data: any) => {
      data = data.map(this.parserService.podcastDataParser);

      // Filter out podcasts without an image
      data = data.filter((item: IPodcast) => item.image_url);

      this.podcasts.set(data);

      this.fetchEpisodes();
    });
  }

  findPodcast(id: number): IPodcast | null {
    return this.podcasts().find((podcast) => podcast.id === id) ?? null;
  }

  static makeNameURLReadable(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
      .replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens
      .replace(/-+/g, '-'); // Replace multiple consecutive hyphens with single hyphen
  }

  decodeEpisodeURL(urlName: string): IEpisode | undefined {
    return this.decodeNameURL(urlName, this.episodes());
  }

  decodePodcastURL(urlName: string): IPodcast | undefined {
    return this.decodeNameURL(urlName, this.podcasts());
  }

  decodeAffiliateURL(urlName: string): IAffiliate | undefined {
    return this.decodeNameURL(urlName, this.affiliates());
  }

  decodeNameURL<T extends IPodcast | IAffiliate | IEpisode>(urlName: string, items: T[]): T | undefined {
    // Since we can't perfectly reverse the URL transformation, 
    // we need to find the original item by matching
    return items.find(item =>
      PodcastService.makeNameURLReadable(item.title) === urlName
    );
  }

  public fetchEpisodes() {
    this.http.get(this.apiUrl + '/rest/episodes').subscribe((data: any) => {
      data = data.map(this.parserService.episodeDataParser);

      this.episodes.set(data);

      data.forEach((episode: IEpisode) => {
        let podcast = this.podcasts().find(
          (podcast) => podcast.id === episode.podcast_id
        );

        if (podcast) {
          podcast.episodes = podcast.episodes || [];
          episode.host_name = podcast.host_name;
          podcast.episodes.push(episode);
        }
      });
    });

    this.fetchAffiliates();
  }

  public fetchAffiliates() {
    this.http.get(this.apiUrl + '/rest/affiliates').subscribe((data: any) => {
      data = data.map(this.parserService.affiliateDataParser);

      // Filter out affilities without an image
      data = data.filter((item: IAffiliate) => item.image_url);

      this.affiliates.set(data);

      this.fetchAffiliatePodcasts();
    });
  }

  private fetchAffiliatePodcasts() {
    this.http
      .get(this.apiUrl + '/rest/affiliate-podcasts')
      .subscribe((data: any) => {
        data = data.map(this.parserService.affiliatePodcastDataParser);

        data.forEach((affiliatePodcast: IAffiliatePodcast) => {
          let affiliate = this.affiliates().find(
            (affiliate) => affiliate.uuid === affiliatePodcast.target_uuid
          );

          let podcast = this.podcasts().find(
            (p) => p.uuid === affiliatePodcast.uuid
          );

          if (affiliate && podcast) {
            affiliate.podcasts = affiliate.podcasts || [];
            affiliate.podcasts.push(podcast);
          }
        });
      });
  }
}
