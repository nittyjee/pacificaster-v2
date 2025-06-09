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
import { NotFoundComponent } from "../../components/not-found/not-found.component";
import { LoadingComponent } from "../../components/loading/loading.component";
import { PlayerService } from 'src/app/services/player.service';
import { PlayerModalComponent } from "../../components/player-modal/player-modal.component";

@Component({
  selector: 'app-podcast-detail',
  templateUrl: './podcast-detail.page.html',
  styleUrls: ['./podcast-detail.page.scss'], standalone: true,
  imports: [
    IonContent,
    EpisodeListComponent,
    ThumbnailComponent,
    IonIcon,
    HeaderComponent,
    NotFoundComponent,
    LoadingComponent,
    PlayerModalComponent
],
})
export class PodcastDetailPage {
  @Input() podcastId!: string;
  podcast?: IPodcast;
  podcastNotFound?: boolean;
  someTimePassed = false;
  @Input() isSidebar = false;

  public player = inject(PlayerService);
  private podcastService = inject(PodcastService);
  private screenSizeService = inject(ScreenSizeService);
  constructor(private modalCtrl: ModalController) {
    effect(() => {
      this.podcast = this.podcastService.decodePodcastURL(this.podcastId);
      this.podcastNotFound = !!this.podcast;
    });

    setTimeout(() => {
      this.someTimePassed = true;
    }, 800);
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
