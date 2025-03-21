import { Injectable, signal } from '@angular/core';
import { IEpisode } from '../interfaces/episode.interface';
import { Howl, Howler } from 'howler';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  currentEpisode = signal<IEpisode>({} as IEpisode);

  private howl?: Howl;

  totalDuration = 0;
  currentTime = 0;

  private _isSeeking = false;
  private _timeStartSeeking?: number;

  get isSeeking(): boolean {
    return this._isSeeking;
  }

  get timeStartSeeking(): number {
    return this._timeStartSeeking || 0;
  }

  speed = 1;

  private logInterval: any;

  play(episode: IEpisode) {
    if (!this.howl) {
      this.initHowl(episode.audio_url);
    }

    if (this.currentEpisode().id !== episode.id) {
      this.currentEpisode.set(episode);

      this.howl?.unload();

      this.initHowl(episode.audio_url);
    }

    if (!this.howl?.playing()) {
      this.howl?.play();
    }
  }

  initHowl(src: string) {
    this.howl = new Howl({
      src: src,
      html5: true,
    });

    this.howl.on('load', () => {
      this.totalDuration = this.howl!.duration();

      this.logCurrentTime();
    });
  }

  logCurrentTime() {
    clearInterval(this.logInterval);

    this.logInterval = setInterval(() => {
      if (this.howl?.playing() && !this.isSeeking) {
        this.currentTime = this.howl?.seek();
      }
    }, 1000);
  }

  startSeeking(timeStarted: number) {
    this._isSeeking = true;
    this._timeStartSeeking = timeStarted;
  }

  endSeeking(value: number) {
    this.howl?.seek(this.currentTime + value);
    this._isSeeking = false;
    this._timeStartSeeking = undefined;
  }

  jump(value: number) {
    this.howl?.seek(value);
  }

  pause() {
    if (this.howl && this.howl.playing()) {
      this.howl.pause();
    }
  }

  continue() {
    if (this.howl && !this.howl.playing()) {
      this.howl.play();
    }
  }

  changeSpeed(speed: number) {
    this.speed = speed;
    this.howl?.rate(speed);
  }

  isPlaying(): boolean {
    if (!this.howl) return false;
    return this.howl.playing();
  }

  isInitialized(): boolean {
    return !!this.howl;
  }

  mute() {
    this.howl?.volume(0);
  }

  unmute() {
    setTimeout(() => {
      this.howl?.volume(1);
    }, 100);
  }
}
