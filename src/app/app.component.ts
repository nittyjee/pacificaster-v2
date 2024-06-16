import { Component, OnInit, inject } from '@angular/core';
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
} from '@ionic/angular/standalone';
import { PlayerService } from './services/player.service';
import { MiniPlayerComponent } from './components/mini-player/mini-player.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { TabbarComponent } from './components/tabbar/tabbar.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonSplitPane,
    IonApp,
    IonRouterOutlet,
    RouterOutlet,
    MiniPlayerComponent,
    TabbarComponent,
  ],
})
export class AppComponent implements OnInit {
  public player = inject(PlayerService);

  private router = inject(Router);

  isMobile = window.innerWidth < 768;

  constructor() {}

  ngOnInit(): void {
    if (window.location.pathname === '/') {
      if (this.isMobile) {
        this.router.navigate(['/mobile']);
      } else {
        this.router.navigate(['/desktop']);
      }
    }
  }
}
