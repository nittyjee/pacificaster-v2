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
import { IAffiliate } from 'src/app/interfaces/affiliate.interface';
import { AffiliateService } from 'src/app/services/affiliate.service';

@Component({
  selector: 'app-affiliate-detail',
  templateUrl: './affiliate-detail.page.html',
  styleUrls: ['./affiliate-detail.page.scss'],
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
export class AffiliateDetailPage implements OnInit {
  @Input() affiliateId!: string;

  isMobile = window.innerWidth < 768;

  affiliate!: IAffiliate;

  private affiliateService = inject(AffiliateService);

  constructor(private modalCtrl: ModalController) {
    effect(() => {
      this.affiliate =
        this.affiliateService
          .affiliates()
          .find((affiliate) => affiliate.uuid === this.affiliateId) ??
        ({} as IAffiliate);
    });
  }

  ngOnInit(): void {
    if (this.affiliateService.affiliates().length === 0)
      this.affiliateService.fetchAffiliates();
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
