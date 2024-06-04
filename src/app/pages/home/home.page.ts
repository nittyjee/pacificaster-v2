import { Component, OnInit, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSplitPane,
  IonMenu,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
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
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    PodcastListComponent,
    IonRouterOutlet,
  ],
})
export class HomePage implements OnInit {
  public podcastService = inject(PodcastService);

  constructor() {}

  ngOnInit(): void {
    this.podcastService.fetchPodcasts();
  }
}
