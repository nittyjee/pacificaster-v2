import {
  AfterViewInit,
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
  ],
})
export class PlayerModalComponent implements OnInit, AfterViewInit, OnDestroy {
  private modalCtrl = inject(ModalController);
  public player = inject(PlayerService);
  private route = inject(ActivatedRoute);

  showPauseOverlay = false;

  constructor() {}

  ngOnInit() {
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

  onClick() {
    if (this.player.howl.playing()) {
      this.player.howl.pause();
      this.showPauseOverlay = true;
    } else {
      this.player.howl.play();
      this.showPauseOverlay = false;
    }
  }
}
