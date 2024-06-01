import { Injectable, signal } from '@angular/core';
import { IEpisode } from '../interfaces/episode.interface';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  isPlayerVisible = signal<boolean>(false);
  isPlaying = signal<boolean>(false);

  currentEpisode = signal<IEpisode>({} as IEpisode);

  play(episode: IEpisode) {
    if (!this.isPlayerVisible()) {
      this.isPlayerVisible.set(true);
    }

    if (this.currentEpisode().id !== episode.id) {
      this.currentEpisode.set(episode);
    }

    this.isPlaying.set(true);
  }

  pause(episode: IEpisode) {
    this.isPlaying.set(false);
  }
}
