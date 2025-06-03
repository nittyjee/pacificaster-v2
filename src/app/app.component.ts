import { Component, HostListener, OnInit, inject } from '@angular/core';
import {
  IonApp,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { MiniPlayerComponent } from './components/mini-player/mini-player.component';
import { TabbarComponent } from './components/tabbar/tabbar.component';
import { PlayerService } from './services/player.service';
import { PodcastService } from './services/podcast.service';
import { ScreenSizeService } from './services/screen-size.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonApp,
    IonRouterOutlet,
    MiniPlayerComponent,
    TabbarComponent,
  ],
})
export class AppComponent implements OnInit {
  public player = inject(PlayerService);
  private podcastService = inject(PodcastService);

  private screenSizeService = inject(ScreenSizeService);

  constructor() {}

  ngOnInit(): void {
    this.podcastService.initialize();
  }

  get isMobile(): boolean {
    return this.screenSizeService.isMobile();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
  // Force change detection when window is resized
  // This ensures the layout updates properly
  }
}
