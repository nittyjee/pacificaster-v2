import { Component, OnInit, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSplitPane,
  IonMenu,
} from '@ionic/angular/standalone';
import { PodcastListComponent } from 'src/app/components/podcast-list/podcast-list.component';
import { PodcastService } from 'src/app/services/podcast.service';
import { HomePage } from '../home/home.page';
import { PodcastDetailPage } from '../podcast-detail/podcast-detail.page';

@Component({
  selector: 'app-home-desktop',
  templateUrl: 'home-desktop.page.html',
  styleUrls: ['home-desktop.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    PodcastListComponent,
    HomePage,
    PodcastDetailPage,
    IonSplitPane,
    IonMenu,
  ],
})
export class HomeDesktopPage implements OnInit {
  public podcastService = inject(PodcastService);
  show = false;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.show = true;
    }, 3000);
    this.podcastService.fetchPodcasts();
  }
}
