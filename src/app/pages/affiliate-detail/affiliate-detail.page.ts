import { Component, Input, OnInit, effect, inject } from '@angular/core';
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
import { PodcastService } from 'src/app/services/podcast.service';
import { ScreenSizeService } from 'src/app/services/screen-size.service';

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
  ],
})
export class AffiliateDetailPage implements OnInit {
  @Input() affiliateId!: string;

  affiliate!: IAffiliate;

  private podcastService = inject(PodcastService);
  private screenSizeService = inject(ScreenSizeService);

  constructor(private modalCtrl: ModalController) {
    effect(() => {
      this.affiliate =
        this.podcastService
          .affiliates()
          .find((affiliate) => affiliate.uuid === this.affiliateId) ??
        ({} as IAffiliate);
    });
  }
  ngOnInit(): void {
    if (this.podcastService.affiliates().length === 0)
      this.podcastService.fetchAffiliates();
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

    const { data, role } = await modal.onWillDismiss();
  }
}
