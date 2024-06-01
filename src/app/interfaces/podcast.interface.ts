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
}
