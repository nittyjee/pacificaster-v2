import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPodcast } from '../interfaces/podcast.interface';
import { IEpisode } from '../interfaces/episode.interface';
import { IAffiliate } from '../interfaces/affiliate.interface';

@Injectable({
  providedIn: 'root',
})
export class AffiliateService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  public affiliates = signal<IAffiliate[]>([]);
  public podcasts = signal<IPodcast[]>([]);

  public fetchAffiliates() {
    this.http.get(this.apiUrl + '/rest/affiliates').subscribe((data: any) => {
      console.log('AFFILATES ', data);

      data = data.map(this.affiliateDataParser);

      // Filter out podcasts without an image
      data = data.filter((item: IAffiliate) => item.image_url);

      this.affiliates.set(data);

      this.fetchPodcasts();
    });
  }

  private fetchPodcasts() {
    this.http
      .get(this.apiUrl + '/rest/affiliate-podcasts')
      .subscribe((data: any) => {
        console.log('AFFILATE PODCASTS ', data);
      });
  }

  // This function is used to parse the data from the API into the IPodcast interface
  private affiliateDataParser(data: any): IAffiliate {
    let affiliateData: IAffiliate = {
      type: 'affiliate',
      id: data.id[0]?.value,
      uuid: data.uuid[0]?.value,
      title: data.label[0]?.value,
      description: data.field_long_description[0]?.value,
      image_url: data.field_logo[0]?.url,
      podcasts: [],
      social: [
        {
          type: 'website',
          url: data.field_website_partner_sml[0]?.platform_values.website.value,
          icon: 'home-outline',
        },
        {
          type: 'twitter',
          url: data.field_twitter_partner_sml[0]?.platform_values.twitter.value,
          icon: 'logo-twitter',
        },
        {
          type: 'facebook',
          url: data.field_facebook_partner_sml[0]?.platform_values.facebook
            .value,
          icon: 'logo-facebook',
        },
        {
          type: 'instagram',
          url: data.field_instagram_partner_sml[0]?.platform_values.instagram
            .value,
          icon: 'logo-instagram',
        },
        {
          type: 'linkedin',
          url: data.field_linkedin_partner_sml[0]?.platform_values.linkedin
            .value,

          icon: 'logo-linkedin',
        },
        {
          type: 'tumblr',
          url: data.field_tumblr_partner_sml[0]?.platform_values.tumblr.value,
          icon: 'logo-tumblr',
        },
        {
          type: 'mail',
          url: data.field_email_partner_sml[0]?.platform_values.email.value,
          icon: 'mail-outline',
        },
        {
          type: 'donation',
          url: data.field_donation_link[0]?.value,
          icon: 'cash-outline',
        },
      ],
    } as IAffiliate;

    return affiliateData;
  }
}
