import { IPodcast } from './podcast.interface';

export interface IAffiliate {
  type: 'affiliate';
  id: number;
  uuid: string;
  title: string;
  description: string;
  image_url: string;
  podcasts: IPodcast[];
  social: ISocialLink[];
}

export interface ISocialLink {
  type:
    | 'website'
    | 'twitter'
    | 'facebook'
    | 'instagram'
    | 'linkedin'
    | 'tumblr'
    | 'mail'
    | 'donation';
  url: string;
  icon: string;
}

export interface IAffiliatePodcast {
  type: 'affiliate-podcast';
  id: number;
  uuid: string;
  target_id: number;
  target_uuid: string;
  title: string;
}
