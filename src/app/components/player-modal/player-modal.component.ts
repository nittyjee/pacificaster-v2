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
export class PlayerModalComponent implements OnInit, AfterViewInit, OnDestroy {
  private modalCtrl = inject(ModalController);
  public player = inject(PlayerService);
  private route = inject(ActivatedRoute);

  showPauseOverlay = false;

  speedOptions = [1, 1.25, 1.5, 2];
  selectedSpeed = this.speedOptions[0];

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
  }

  ngAfterViewInit(): void {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  ngOnDestroy() {}

  onPlay(event: Event) {
    this.player.contuniue();
    this.showPauseOverlay = false;
  }

  onPause(event: Event) {
    this.player.pause();
    this.showPauseOverlay = true;
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
}
