import { Injectable, signal } from '@angular/core';
import { IEpisode } from '../interfaces/episode.interface';
import { Howl, Howler } from 'howler';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  currentEpisode = signal<IEpisode>({} as IEpisode);

  private howl!: Howl;

  totalDuration = 0;
  currentTime = 0;

  speed = 1;

  private logInterval: any;

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
  }

  logCurrentTime() {
    clearInterval(this.logInterval);

    this.logInterval = setInterval(() => {
      if (this.howl.playing()) {
        this.currentTime = this.howl.seek();
      }
    }, 1000);
  }

  seek(value: number) {
    this.howl.seek(this.currentTime + value);
  }

  jump(value: number) {
    this.howl.seek(value);
  }

  pause() {
    if (this.howl.playing()) {
      this.howl.pause();
    }
  }

  contuniue() {
    if (!this.howl.playing()) {
      this.howl.play();
    }
  }

  changeSpeed(speed: number) {
    this.speed = speed;
    this.howl.rate(speed);
  }

  isPlaying(): boolean {
    if (!this.howl) return false;
    return this.howl.playing();
  }

  isInitialized(): boolean {
    return !!this.howl;
  }

  mute() {
    if (this.howl) {
      this.howl.volume(0);
    }
  }

  unmute(volume: number = 1) {
    if (this.howl) {
      setTimeout(() => {
        this.howl.volume(volume);
      }, 100);
    }
  }
}
