import { IPodcast } from './podcast.interface';

export interface IAffiliate {
  type: string;
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
