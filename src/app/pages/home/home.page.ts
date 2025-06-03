import { Component, inject, signal } from '@angular/core';
import {
  IonContent,
  IonImg
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ListComponent } from 'src/app/components/list/list.component';
import { PlayerService } from 'src/app/services/player.service';
import { PodcastService } from 'src/app/services/podcast.service';
import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { PlayerModalComponent } from "../../components/player-modal/player-modal.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonImg,
    ListComponent,
    HeaderComponent,
    PlayerModalComponent
],
})
export class HomePage {
  public podcastService = inject(PodcastService);
  public player = inject(PlayerService);
  private screenSizeService = inject(ScreenSizeService);

  isList = signal<boolean>(false);

  constructor() {}

  get isMobile(): boolean {
    return this.screenSizeService.isMobile();
  }

  onLayoutChange(eventData: boolean) {
    this.isList.set(eventData);
  }
}
