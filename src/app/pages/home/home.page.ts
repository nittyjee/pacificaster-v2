import { Component, OnInit, inject, signal } from '@angular/core';
import {
  IonContent,
  IonImg,
  IonMenu,
  IonRouterOutlet,
  IonSplitPane,
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ListComponent } from 'src/app/components/list/list.component';
import { PlayerService } from 'src/app/services/player.service';
import { PodcastService } from 'src/app/services/podcast.service';
import { PlayerModalComponent } from "../../components/player-modal/player-modal.component";

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
    PlayerModalComponent
],
})
export class HomePage implements OnInit {
  public podcastService = inject(PodcastService);
  public player = inject(PlayerService);

  isMobile = window.innerWidth < 768;

  isList = signal<boolean>(false);

  constructor() {}

  ngOnInit(): void {
    this.podcastService.fetchPodcasts();
    // this.podcastService.fetchAffiliates();
  }

  onLayoutChange(eventData: boolean) {
    this.isList.set(eventData);
  }
}
