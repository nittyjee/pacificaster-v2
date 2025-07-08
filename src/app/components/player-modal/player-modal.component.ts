import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  OnDestroy,
  inject
} from '@angular/core';
import {
  AlertController,
  IonButton,
  IonButtons,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonToolbar,
  ModalController,
  Platform
} from '@ionic/angular/standalone';

import { NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TimelinePipe } from 'src/app/pipes/timeline.pipe';
import { PlayerService } from 'src/app/services/player.service';
import { EpisodeInfoModalComponent } from '../episode-info-modal/episode-info-modal.component';
import { PlayerTimelineComponent } from '../player-timeline/player-timeline.component';
import { PlayerWaveformComponent } from '../player-waveform/player-waveform.component';

@Component({
  selector: 'app-player-modal',
  templateUrl: './player-modal.component.html',
  styleUrls: ['./player-modal.component.scss'],
  standalone: true,
  imports: [
    IonToolbar,
    IonButtons,
    IonIcon,
    IonButton,
    PlayerTimelineComponent,
    TimelinePipe,
    PlayerWaveformComponent,
    IonSelect,
    IonSelectOption,
    FormsModule,
    NgTemplateOutlet,
  ],
})
export class PlayerModalComponent implements OnInit, OnDestroy {
  @Input() inLimitedSpace = false;
  private modalCtrl = inject(ModalController);
  public player = inject(PlayerService);
  private route = inject(ActivatedRoute);

  showPauseOverlay = false;
  private statusCheckInterval: ReturnType<typeof setInterval> | null = null;

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
    this.showPauseOverlay = !this.player.isPlaying();
    this.route.fragment.subscribe((fragment: string | null) => {
      if (fragment === null) {
        this.cancel();
      }
    });

    // Start interval to check player status every second
    this.statusCheckInterval = setInterval(() => {
      const isPlaying = this.player.isPlaying();
      if (this.showPauseOverlay === isPlaying) {
        this.showPauseOverlay = !isPlaying;
        this.cdr.detectChanges();
      }
    }, 1000);
  }

  ngOnDestroy() {
    // Clear the interval when component is destroyed
    if (this.statusCheckInterval) {
      clearInterval(this.statusCheckInterval);
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  onPause() {
    this.player.pause();
    this.showPauseOverlay = true;
  }

  onTouchMove(event: TouchEvent) {
    this.player.mute();
    this.isSearch = true;
  }

  //runs when the finger is lifted off the screen
  onTouched(event: TouchEvent) {
    this.player.unmute();
    if (!this.isSearch) {
      this.player.pause();
      this.showPauseOverlay = true;
    }
    this.isSearch = false;
  }

  onTouchendPlay(event: TouchEvent) {
    this.player.continue();
    this.player.unmute();
    this.showPauseOverlay = false;
  }

  mouseDown(event: MouseEvent) {
    this.isMouseDown = true;
  }

  //if the mouse is lifter up outised of the player we also need to unmute
  // @HostListener('document:mouseup', ['$event'])
  mouseUp(event: MouseEvent) {
    if (this.isSearch || this.showPauseOverlay) {
      this.player.continue();
      this.showPauseOverlay = false;
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
