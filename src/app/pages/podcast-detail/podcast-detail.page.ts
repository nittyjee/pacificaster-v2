import { KeyValuePipe } from '@angular/common';
import { Component, Input, OnInit, effect, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  ModalController,
  IonIcon,
  IonButton,
  ViewWillEnter,
  ViewDidEnter,
  ViewWillLeave,
  ViewDidLeave,
  IonFooter,
} from '@ionic/angular/standalone';
import { EpisodeListComponent } from 'src/app/components/episode-list/episode-list.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { PodcastInfoModalComponent } from 'src/app/components/podcast-info-modal/podcast-info-modal.component';
import { ThumbnailComponent } from 'src/app/components/thumbnail/thumbnail.component';
import { IPodcast } from 'src/app/interfaces/podcast.interface';
import { PodcastService } from 'src/app/services/podcast.service';

@Component({
  selector: 'app-podcast-detail',
  templateUrl: './podcast-detail.page.html',
  styleUrls: ['./podcast-detail.page.scss'],
  standalone: true,
  imports: [
    IonFooter,
    IonContent,
    EpisodeListComponent,
    PodcastInfoModalComponent,
    ThumbnailComponent,
    IonIcon,
    KeyValuePipe,
    HeaderComponent,
  ],
})
export class PodcastDetailPage implements OnInit {
  @Input() podcastId!: string;

  isMobile = window.innerWidth < 768;

  podcast!: IPodcast;

  private podcastService = inject(PodcastService);

  constructor(private modalCtrl: ModalController) {
    effect(() => {
      this.podcast =
        this.podcastService
          .podcasts()
          .find((podcast) => podcast.uuid === this.podcastId) ??
        ({} as IPodcast);
    });
  }

  ngOnInit(): void {
    if (this.podcastService.podcasts().length === 0)
      this.podcastService.fetchPodcasts();
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
