import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
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
  private router = inject(Router);

  isList = signal<boolean>(false);
  private lastSidebar: string[] | null = null;

  constructor() {}

  get isMobile(): boolean {
    return this.screenSizeService.isMobile();
  }

  onLayoutChange(eventData: boolean) {
    this.isList.set(eventData);
  }

  // Clicking the logo toggles the desktop sidebar:
  // if a sidebar is open, remember it and close; if closed, reopen the last one.
  onLogoClick() {
    const sidebarGroup = this.router.parseUrl(this.router.url).root.children['sidebar'];

    if (sidebarGroup) {
      this.lastSidebar = sidebarGroup.segments.map((s) => s.path);
      this.router.navigate([{ outlets: { sidebar: null } }]);
    } else if (this.lastSidebar) {
      this.router.navigate([{ outlets: { sidebar: this.lastSidebar } }]);
    }
  }
}
