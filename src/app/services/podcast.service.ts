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
