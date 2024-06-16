import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { PlayButtonComponent } from '../play-button/play-button.component';
import { IonRange, ModalController, IonIcon } from '@ionic/angular/standalone';
import { IEpisode } from 'src/app/interfaces/episode.interface';
import { PlayerModalComponent } from '../player-modal/player-modal.component';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';
import { PlayerTimelineComponent } from '../player-timeline/player-timeline.component';
import { TimelinePipe } from 'src/app/pipes/timeline.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mini-player',
  templateUrl: './mini-player.component.html',
  styleUrls: ['./mini-player.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonRange,
    PlayButtonComponent,
    ThumbnailComponent,
    PlayerTimelineComponent,
    TimelinePipe,
  ],
})
export class MiniPlayerComponent implements OnInit, AfterViewInit {
  @ViewChild('audio') audio!: ElementRef;

  public player = inject(PlayerService);
  private modalCtrl = inject(ModalController);
  private router = inject(Router);

  currentEpisode: IEpisode = {} as IEpisode;

  currentTime = '00:00:00';
  totalDuration = '00:00:00';
  timelineMax = 100;
  currentTimeline = 0;
  isTimelineDragging = false;

  constructor() {
    effect(() => {
      if (this.player.isPlaying() && this.currentEpisode.audio_url) {
        // this.audio.nativeElement.play();
      } else {
        // this.audio.nativeElement.pause();
      }

      if (this.player.currentEpisode().id !== this.currentEpisode.id) {
        this.currentEpisode = this.player.currentEpisode();

        // this.audio.nativeElement.src = this.currentEpisode.audio_url;

        // this.audio.nativeElement.load();

        this.start();
      }
    });
  }

  ngOnInit() {}

  start() {
    // this.audio.nativeElement.play();
  }

  ngAfterViewInit(): void {
    // this.currentTime = this.audio.nativeElement.currentTime;
  }

  onLoad(event: any) {
    this.totalDuration = this.convertSeconds(this.audio.nativeElement.duration);
    this.timelineMax = Math.floor(this.audio.nativeElement.duration);
  }

  onTimeUpdate(event: any) {
    if (!this.isTimelineDragging) {
      this.currentTimeline = this.audio.nativeElement.currentTime;
    }
  }

  get getTime() {
    if (!this.audio) return '00:00:00';

    return this.convertSeconds(this.audio.nativeElement.currentTime);
  }

  onTimelineChange(event: any) {
    this.audio.nativeElement.currentTime = event.detail.value;
  }

  onIonKnobMoveStart(ev: Event) {
    this.isTimelineDragging = true;
  }

  onIonKnobMoveEnd(ev: Event) {
    this.isTimelineDragging = false;
  }

  onStop() {
    this.audio.nativeElement.pause();
  }

  pinFormatter(value: number) {
    const seconds = value;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    let timeString = [hours, minutes, remainingSeconds]
      .map((v) => (v < 10 ? '0' + v : v))
      .join(':');

    // // If the hours are 0, return just MM:SS.
    // if (hours === 0) {
    //   timeString = timeString.substr(3);
    // }

    return timeString;
  }

  convertSeconds(time: number) {
    const seconds = time;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    let timeString = [hours, minutes, remainingSeconds]
      .map((v) => (v < 10 ? '0' + v : v))
      .join(':');

    // // If the hours are 0, return just MM:SS.
    // if (hours === 0) {
    //   timeString = timeString.substr(3);
    // }

    return timeString;
  }

  async openModal(event: Event) {
    event.stopPropagation();
    event.stopImmediatePropagation();

    const modal = await this.modalCtrl.create({
      component: PlayerModalComponent,
      cssClass: 'player-modal',
      canDismiss: true,
    });
    modal.present();

    this.router.navigate([], { fragment: 'player-modal' });

    modal.onWillDismiss().then(() => {
      this.router.navigate([], { fragment: '' });
    });
  }
}
