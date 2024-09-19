import { Component, OnInit, inject, signal } from '@angular/core';
import {
  IonContent,
  IonSplitPane,
  IonMenu,
  IonRouterOutlet,
  IonImg,
} from '@ionic/angular/standalone';
import { filter } from 'rxjs';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ListComponent } from 'src/app/components/list/list.component';
import { AffiliateService } from 'src/app/services/affiliate.service';
import { PodcastService } from 'src/app/services/podcast.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonSplitPane,
    IonMenu,
    IonContent,
    IonImg,
    ListComponent,
    IonRouterOutlet,
    HeaderComponent,
  ],
})
export class HomePage implements OnInit {
  public podcastService = inject(PodcastService);
  public affiliateService = inject(AffiliateService);

  isMobile = window.innerWidth < 768;

  isList = signal<boolean>(false);

  constructor() {}

  ngOnInit(): void {
    this.podcastService.fetchPodcasts();
    this.affiliateService.fetchAffiliates();
  }

  onLayoutChange(eventData: boolean) {
    this.isList.set(eventData);
  }
}
