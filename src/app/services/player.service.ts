import { Injectable, signal } from '@angular/core';
import { IEpisode } from '../interfaces/episode.interface';
import { Howl, Howler } from 'howler';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  isPlayerVisible = signal<boolean>(false);
  isPlaying = signal<boolean>(false);

  currentEpisode = signal<IEpisode>({} as IEpisode);

  howl!: Howl;

  totalDuration = 0;
  currentTime = 0;

  speed = 1;

  constructor() {}

  play(episode: IEpisode) {
    if (!this.howl) {
      this.initHowl(episode.audio_url);
    }

    if (this.currentEpisode().id !== episode.id) {
      this.currentEpisode.set(episode);

      this.howl.unload();

      this.initHowl(episode.audio_url);
    }

    if (!this.howl.playing()) {
      this.howl.play();
      this.isPlaying.set(true);
    }
  }

  initHowl(src: string) {
    this.howl = new Howl({
      src: src,
      html5: true,
    });

    this.howl.on('load', () => {
      this.totalDuration = this.howl.duration();

      this.logCurrentTime();
    });

    this.isPlayerVisible.set(true);
  }

  logCurrentTime() {
    setInterval(() => {
      this.currentTime = this.howl.seek();
    }, 1000);
  }

  seek(value: number) {
    this.howl.seek(this.currentTime + value);
  }

  pause() {
    if (this.howl.playing()) {
      this.howl.pause();
      this.isPlaying.set(false);
    }
  }

  contuniue() {
    if (!this.howl.playing()) {
      this.howl.play();

      this.isPlaying.set(true);
    }
  }
}
