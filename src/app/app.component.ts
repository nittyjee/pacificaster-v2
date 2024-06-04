import { Component, inject } from '@angular/core';
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
} from '@ionic/angular/standalone';
import { PlayerService } from './services/player.service';
import { MiniPlayerComponent } from './components/mini-player/mini-player.component';
import { RouterOutlet } from '@angular/router';

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
export class AppComponent {
  public player = inject(PlayerService);

  constructor() {}
}
