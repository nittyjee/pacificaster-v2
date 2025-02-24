import { Injectable } from '@angular/core';
import { IEpisode } from '../interfaces/episode.interface';
import { IPodcast } from '../interfaces/podcast.interface';
import {
  IAffiliate,
  IAffiliatePodcast,
} from '../interfaces/affiliate.interface';

@Injectable({ providedIn: 'root' })
export class ParserService {
  constructor() {}

  // This function is used to parse the data from the API into the IPodcast interface
  public podcastDataParser(data: any): IPodcast {
    let podcastData: IPodcast = {
      type: 'podcast',
      id: data.nid[0]?.value,
      uuid: data.uuid[0]?.value,
      title: data.title[0]?.value,
      description: data.field_description[0]?.value,
      description_short: data.field_short_description[0]?.value,
      host_name: data.field_host_name_s_[0]?.value,
      image_url: data.field_picture[0]?.url,
      episodes: [],
      social: [
        {
          type: 'website',
          url: data.field_website_sml[0]?.platform_values.website.value,
          icon: 'home-outline',
        },
        {
          type: 'rss',
          url: data.field_rss_custom_link[0]?.platform_values.rss.value,
          icon: 'logo-rss',
        },
        {
          type: 'twitter',
          url: data.field_twitter_sml[0]?.platform_values.twitter.value,
          icon: 'logo-twitter',
        },
        {
          type: 'facebook',
          url: data.field_facebook_sml[0]?.platform_values.facebook.value,
          icon: 'logo-facebook',
        },
        {
          type: 'instagram',
          url: data.field_instagram_sml[0]?.platform_values.instagram.value,
          icon: 'logo-instagram',
        },
        {
          type: 'linkedin',
          url: data.field_linkedin_sml[0]?.platform_values.linkedin.value,

          icon: 'logo-linkedin',
        },
        {
          type: 'tumblr',
          url: data.field_tumblr_sml[0]?.platform_values.tumblr.value,
          icon: 'logo-tumblr',
        },
        {
          type: 'mail',
          url: data.field_email_sml[0]?.platform_values.email.value,
          icon: 'mail-outline',
        },
        {
          type: 'donation',
          url: data.field_donation_link[0]?.value,
          icon: 'cash-outline',
        },
      ],
    };

    return podcastData;
  }

  // This function is used to parse the data from the API into the IPodcast interface
  public episodeDataParser(data: any): IEpisode {
    let episodeData: IEpisode = {
      type: 'episode',
      id: data.nid[0]?.value,
      uuid: data.uuid[0]?.value,
      title: data.title[0]?.value,
      description: data.field_description_html[0]?.value,
      description_short: data.field_short_description_html[0]?.value,
      length: data.field_length_hmmss_[0]?.value,
      image_url: data.field_picture_episode[0]?.url,
      audio_url: data.field_audio_file[0]?.url,
      podcast_id: data.field_podcast[0]?.target_id,
      published_at: data.created[0]?.value,
    };

    return episodeData;
  }

  // This function is used to parse the data from the API into the IPodcast interface
  public affiliateDataParser(data: any): IAffiliate {
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

  // This function is used to parse the data from the API into the IPodcast interface
  public affiliatePodcastDataParser(data: any): IAffiliatePodcast {
    let affiliatePodcastData: IAffiliatePodcast = {
      type: 'affiliate-podcast',
      id: data.entity_id[0]?.target_id,
      uuid: data.entity_id[0]?.target_uuid,
      target_id: data.gid[0].target_id,
      target_uuid: data.gid[0].target_uuid,
      title: data.label[0].value,
    } as IAffiliatePodcast;

    return affiliatePodcastData;
  }
}
