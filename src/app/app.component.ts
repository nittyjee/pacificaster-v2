import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { PlayerService } from './services/player.service';
import { MiniPlayerComponent } from './components/mini-player/mini-player.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, MiniPlayerComponent],
})
export class AppComponent {
  public player = inject(PlayerService);

  constructor() {}
}
