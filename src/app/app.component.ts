import { Component, OnInit, inject, HostListener } from '@angular/core';
import {
  IonApp,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { PlayerService } from './services/player.service';
import { MiniPlayerComponent } from './components/mini-player/mini-player.component';
import { Router } from '@angular/router';
import { TabbarComponent } from './components/tabbar/tabbar.component';
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
  private router = inject(Router);
  private screenSizeService = inject(ScreenSizeService);

  constructor() {}

  ngOnInit(): void {
    // No need for device-specific routing anymore
    // The responsive layout handles this automatically
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
