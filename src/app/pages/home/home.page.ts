import { Component, OnInit, inject } from '@angular/core';
import {
  IonContent,
  IonSplitPane,
  IonMenu,
  IonRouterOutlet,
  IonImg,
} from '@ionic/angular/standalone';
import { filter } from 'rxjs';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { PodcastListComponent } from 'src/app/components/podcast-list/podcast-list.component';
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
    PodcastListComponent,
    IonRouterOutlet,
    HeaderComponent,
  ],
})
export class HomePage implements OnInit {
  public podcastService = inject(PodcastService);

  isMobile = window.innerWidth < 768;
  constructor() {}

  ngOnInit(): void {
    this.podcastService.fetchPodcasts();
  }
}
