import { KeyValuePipe } from '@angular/common';
import { Component, Input, OnInit, effect, inject } from '@angular/core';
import {
  IonContent,
  ModalController,
  IonIcon,
  IonFooter,
} from '@ionic/angular/standalone';
import { EpisodeListComponent } from 'src/app/components/episode-list/episode-list.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { PodcastInfoModalComponent } from 'src/app/components/podcast-info-modal/podcast-info-modal.component';
import { ThumbnailComponent } from 'src/app/components/thumbnail/thumbnail.component';
import { IPodcast } from 'src/app/interfaces/podcast.interface';
import { PodcastService } from 'src/app/services/podcast.service';
import { ScreenSizeService } from 'src/app/services/screen-size.service';

@Component({
  selector: 'app-podcast-detail',
  templateUrl: './podcast-detail.page.html',
  styleUrls: ['./podcast-detail.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    EpisodeListComponent,
    ThumbnailComponent,
    IonIcon,
    HeaderComponent,
  ],
})
export class PodcastDetailPage implements OnInit {
  @Input() podcastId!: string;

  podcast?: IPodcast;

  private podcastService = inject(PodcastService);
  private screenSizeService = inject(ScreenSizeService);

  constructor(private modalCtrl: ModalController) {
    effect(() => {
      this.podcast = this.podcastService.decodePodcastURL(this.podcastId);
    });
  }

  ngOnInit(): void {
    if (this.podcastService.podcasts().length === 0)
      this.podcastService.fetchPodcasts();
  }

  get isMobile(): boolean {
    return this.screenSizeService.isMobile();
  }

  async onDescription() {
    const modal = await this.modalCtrl.create({
      component: PodcastInfoModalComponent,
      breakpoints: [0, 0.5, 1],
      initialBreakpoint: 0.5,
      handleBehavior: 'cycle',
      componentProps: {
        podcast: this.podcast,
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }
}
