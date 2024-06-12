export interface IEpisode {
  id: number;
  uuid: string;
  title: string;
  description: string;
  description_short: string;
  length: string;
  image_url: string;
  audio_url: string;
  podcast_id: number;
  published_at: string;
  host_name?: string;
}
