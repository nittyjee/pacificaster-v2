import { KeyValuePipe } from '@angular/common';
import { Component, Input, OnInit, effect, inject } from '@angular/core';
import {
  IonContent,
  ModalController,
  IonIcon,
  IonFooter,
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { PodcastInfoModalComponent } from 'src/app/components/podcast-info-modal/podcast-info-modal.component';
import { PodcastListComponent } from 'src/app/components/podcast-list/podcast-list.component';
import { ThumbnailComponent } from 'src/app/components/thumbnail/thumbnail.component';
import { IAffiliate } from 'src/app/interfaces/affiliate.interface';
import { PodcastService } from 'src/app/services/podcast.service';

@Component({
  selector: 'app-affiliate-detail',
  templateUrl: './affiliate-detail.page.html',
  styleUrls: ['./affiliate-detail.page.scss'],
  standalone: true,
  imports: [
    IonFooter,
    IonContent,
    PodcastListComponent,
    PodcastInfoModalComponent,
    ThumbnailComponent,
    IonIcon,
    KeyValuePipe,
    HeaderComponent,
  ],
})
export class AffiliateDetailPage implements OnInit {
  @Input() affiliateId!: string;

  isMobile = window.innerWidth < 768;

  affiliate!: IAffiliate;

  private podcastService = inject(PodcastService);

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
