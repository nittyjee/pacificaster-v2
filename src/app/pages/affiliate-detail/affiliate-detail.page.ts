import { Component, Input, effect, inject } from '@angular/core';
import {
  IonContent,
  IonIcon,
  ModalController
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { PodcastInfoModalComponent } from 'src/app/components/podcast-info-modal/podcast-info-modal.component';
import { PodcastListComponent } from 'src/app/components/podcast-list/podcast-list.component';
import { ThumbnailComponent } from 'src/app/components/thumbnail/thumbnail.component';
import { IAffiliate } from 'src/app/interfaces/affiliate.interface';
import { PlayerService } from 'src/app/services/player.service';
import { PodcastService } from 'src/app/services/podcast.service';
import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { LoadingComponent } from "../../components/loading/loading.component";
import { NotFoundComponent } from "../../components/not-found/not-found.component";
import { PlayerModalComponent } from "../../components/player-modal/player-modal.component";

@Component({
  selector: 'app-affiliate-detail',
  templateUrl: './affiliate-detail.page.html',
  styleUrls: ['./affiliate-detail.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    PodcastListComponent,
    ThumbnailComponent,
    IonIcon,
    HeaderComponent,
    NotFoundComponent,
    LoadingComponent,
    PlayerModalComponent
],
})
export class AffiliateDetailPage {
  @Input() affiliateId!: string;
  @Input() isSidebar = false;

  affiliate?: IAffiliate;
  affiliateNotFound?: boolean;

  someTimePassed = false;

  public player = inject(PlayerService);
  private podcastService = inject(PodcastService);
  private screenSizeService = inject(ScreenSizeService);

  constructor(private modalCtrl: ModalController) {
    effect(() => {
      this.affiliate = this.podcastService.decodeAffiliateURL(this.affiliateId)

      this.affiliateNotFound = !!this.affiliate;
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
        podcast: this.affiliate,
      },
    });
    modal.present();

    await modal.onWillDismiss();
  }
}
