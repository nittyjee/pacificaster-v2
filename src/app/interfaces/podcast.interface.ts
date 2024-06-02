import { IEpisode } from './episode.interface';

export interface IPodcast {
  id: number;
  uuid: string;
  title: string;
  description: string;
  description_short: string;
  host_name: string;
  image_url: string;
  episodes: IEpisode[];
  social: ISocialLink[];
}

export interface ISocialLink {
  type:
    | 'website'
    | 'rss'
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
