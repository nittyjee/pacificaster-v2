import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  ModalController,
  IonButton,
  IonIcon,
  IonFooter,
  IonRange,
  AlertController,
  IonPopover,
  IonSelect,
  IonSelectOption,
  Platform,
} from '@ionic/angular/standalone';

import { PlayerService } from 'src/app/services/player.service';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';
import { DatePipe } from '@angular/common';
import { MiniPlayerComponent } from '../mini-player/mini-player.component';
import { PlayerTimelineComponent } from '../player-timeline/player-timeline.component';
import { TimelinePipe } from 'src/app/pipes/timeline.pipe';
import { PlayerWaveformComponent } from '../player-waveform/player-waveform.component';
import { PlayButtonComponent } from '../play-button/play-button.component';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EpisodeInfoModalComponent } from '../episode-info-modal/episode-info-modal.component';

@Component({
  selector: 'app-player-modal',
  templateUrl: './player-modal.component.html',
  styleUrls: ['./player-modal.component.scss'],
  standalone: true,
  imports: [
    IonRange,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonIcon,
    IonButton,
    ThumbnailComponent,
    DatePipe,
    IonFooter,
    MiniPlayerComponent,
    PlayerTimelineComponent,
    TimelinePipe,
    PlayerWaveformComponent,
    PlayButtonComponent,
    IonPopover,
    IonSelect,
    IonSelectOption,
    FormsModule,
  ],
})
export class PlayerModalComponent implements OnInit {
  private modalCtrl = inject(ModalController);
  public player = inject(PlayerService);
  private route = inject(ActivatedRoute);

  showPauseOverlay = false;

  speedOptions = [1, 1.25, 1.5, 2];
  selectedSpeed = this.speedOptions[0];

  isModalOpen = false;
  isMouseDown = false;
  isSearch = false;

  get isTouchDevice(): boolean {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0
    );
  }

  get currentTime(): number {
    return this.player.isSeeking
      ? this.player.timeStartSeeking
      : this.player.currentTime;
  }

  constructor(
    private alertController: AlertController,
    private platform: Platform,
    private cdr: ChangeDetectorRef
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.cancel();
    });
  }

  ngOnInit() {
    // this.showPauseOverlay = !this.player.isPlaying();
    this.route.fragment.subscribe((fragment: string | null) => {
      if (fragment === null) {
        this.cancel();
      }
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  onTouchMove(event: TouchEvent) {
    this.player.mute();
    this.isSearch = true;
  }

  onTouched(event: TouchEvent) {
    this.player.unmute();
    if (!this.isSearch) {
      this.player.pause();
      this.showPauseOverlay = true;
    }
    this.isSearch = false;
  }

  onTouchendPlay(event: TouchEvent) {
    this.player.contuniue();
    this.player.unmute();
    this.showPauseOverlay = false;
  }

  mouseUpPlay(event: MouseEvent) {
    this.player.contuniue();
    this.showPauseOverlay = false;
    this.isMouseDown = false;
  }

  mouseDown(event: MouseEvent) {
    this.isMouseDown = true;
  }

  mouseUp(event: MouseEvent) {
    if (this.isSearch) {
      this.player.contuniue();
    } else {
      this.player.pause();
      this.showPauseOverlay = true;
    }
    
    this.player.unmute();
    this.isMouseDown = false;
    this.isSearch = false;
  }

  mouseMove(event: MouseEvent) {
    if (this.isMouseDown) {
      this.isSearch = true;
      this.player.mute();
    }
  }

  onShare() {
    var url = window.location.href;

    // Copy the text inside the text field
    navigator.clipboard.writeText(url);

    // Alert the copied text
    this.presentAlert(url);
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Copied the share url',
      message: message,
      buttons: ['Close'],
    });

    await alert.present();
  }

  onSpeedChange(speed: number) {
    this.player.changeSpeed(speed);
  }

  onEpisodeDetail() {
    this.openModal();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: EpisodeInfoModalComponent,
      breakpoints: [0, 0.7, 1],
      initialBreakpoint: 0.7,
      handleBehavior: 'cycle',
      cssClass: 'episode-info-player-modal',
      componentProps: {
        episode: this.player.currentEpisode(),
      },
    });
    modal.present();

    modal.addEventListener('ionModalDidPresent', () => {
      this.isModalOpen = true;
    });

    modal.addEventListener('ionModalDidDismiss', () => {
      this.isModalOpen = false;
    });

    const { data, role } = await modal.onWillDismiss();
  }
}
