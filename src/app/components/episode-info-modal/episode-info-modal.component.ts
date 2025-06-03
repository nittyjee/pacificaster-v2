import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import {
  IonContent,
  ModalController
} from '@ionic/angular/standalone';
import { IEpisode } from 'src/app/interfaces/episode.interface';
import { IPodcast } from 'src/app/interfaces/podcast.interface';
import { PodcastService } from 'src/app/services/podcast.service';
import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { PlayButtonComponent } from '../play-button/play-button.component';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';

@Component({
  selector: 'app-episode-info-modal',
  templateUrl: './episode-info-modal.component.html',
  styleUrls: ['./episode-info-modal.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    DatePipe,
    PlayButtonComponent,
    ThumbnailComponent,
  ],
})
export class EpisodeInfoModalComponent implements OnInit {
  @Input() episode!: IEpisode;

  podcast!: IPodcast;

  isModalOpen = false;

  private podcastService = inject(PodcastService);
  private screenSizeService = inject(ScreenSizeService);

  constructor(private modalCtrl: ModalController) {}

  get isMobile(): boolean {
    return this.screenSizeService.isMobile();
  }

  ngOnInit() {
    this.podcast =
      this.podcastService.findPodcast(this.episode.podcast_id) ??
      ({} as IPodcast);
  }

  setOpen(isOpen: boolean) {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
