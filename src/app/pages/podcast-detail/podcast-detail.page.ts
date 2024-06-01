import { Component, Input, OnInit, inject } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { EpisodeListComponent } from 'src/app/components/episode-list/episode-list.component';
import { PodcastInfoModalComponent } from 'src/app/components/podcast-info-modal/podcast-info-modal.component';
import { IPodcast } from 'src/app/interfaces/podcast.interface';
import { PodcastService } from 'src/app/services/podcast.service';

@Component({
  selector: 'app-podcast-detail',
  templateUrl: './podcast-detail.page.html',
  styleUrls: ['./podcast-detail.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonButtons,
    IonBackButton,
    EpisodeListComponent,
    PodcastInfoModalComponent,
    IonIcon,
    IonButton,
  ],
})
export class PodcastDetailPage
  implements OnInit, ViewWillEnter, ViewDidEnter, ViewWillLeave, ViewDidLeave
{
  @Input() podcastId!: string;

  podcast!: IPodcast;

  isViewDidEnter = false;

  private podcastService = inject(PodcastService);

  constructor(private modalCtrl: ModalController) {}

  ngOnInit(): void {
    if (this.podcastService.podcasts().length > 0) {
      this.podcast =
        this.podcastService
          .podcasts()
          .find((podcast) => podcast.uuid === this.podcastId) ??
        ({} as IPodcast);
    } else {
      this.podcastService.fetchPodcasts();

      setTimeout(() => {
        this.podcast =
          this.podcastService
            .podcasts()
            .find((podcast) => podcast.uuid === this.podcastId) ??
          ({} as IPodcast);
      }, 500);
    }
  }

  ionViewWillEnter(): void {
    this.isViewDidEnter = false;
  }

  ionViewDidEnter(): void {
    this.isViewDidEnter = true;
  }

  ionViewWillLeave(): void {
    this.isViewDidEnter = false;
  }

  ionViewDidLeave(): void {
    this.isViewDidEnter = false;
  }

  async onDescription() {
    const modal = await this.modalCtrl.create({
      component: PodcastInfoModalComponent,
      breakpoints: [0, 0.75],
      initialBreakpoint: 0.75,
      componentProps: {
        podcast: this.podcast,
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
    }
  }
}
