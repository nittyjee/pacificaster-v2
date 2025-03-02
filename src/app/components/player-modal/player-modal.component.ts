import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  inject
} from '@angular/core';
import {
  AlertController,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonPopover,
  IonRange,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  ModalController,
  Platform,
} from '@ionic/angular/standalone';

import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TimelinePipe } from 'src/app/pipes/timeline.pipe';
import { PlayerService } from 'src/app/services/player.service';
import { EpisodeInfoModalComponent } from '../episode-info-modal/episode-info-modal.component';
import { MiniPlayerComponent } from '../mini-player/mini-player.component';
import { PlayButtonComponent } from '../play-button/play-button.component';
import { PlayerTimelineComponent } from '../player-timeline/player-timeline.component';
import { PlayerWaveformComponent } from '../player-waveform/player-waveform.component';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';

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
    NgTemplateOutlet,
  ],
})
export class PlayerModalComponent implements OnInit {
  @Input() inLimitedSpace = false;
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
