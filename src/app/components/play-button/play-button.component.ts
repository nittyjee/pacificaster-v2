import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { IEpisode } from 'src/app/interfaces/episode.interface';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon],
})
export class PlayButtonComponent implements OnInit {
  @Input() episode!: IEpisode;
  @Output() play = new EventEmitter<void>();
  @Output() pause = new EventEmitter<void>();

  public player = inject(PlayerService);

  constructor() {}

  ngOnInit() {}

  onPlay() {
    this.player.play(this.episode);
  }

  onPause() {
    this.player.pause(this.episode);
  }
}
