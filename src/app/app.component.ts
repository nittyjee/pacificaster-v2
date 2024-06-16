import { Component, OnInit, inject } from '@angular/core';
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
} from '@ionic/angular/standalone';
import { PlayerService } from './services/player.service';
import { MiniPlayerComponent } from './components/mini-player/mini-player.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonSplitPane,
    IonApp,
    IonRouterOutlet,
    RouterOutlet,
    MiniPlayerComponent,
  ],
})
export class AppComponent implements OnInit {
  public player = inject(PlayerService);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    console.log(window.location);
    if (window.location.pathname === '/') {
      if (window.innerWidth > 768) {
        this.router.navigate(['/desktop']);
      } else {
        this.router.navigate(['/mobile']);
      }
    }
  }
}
