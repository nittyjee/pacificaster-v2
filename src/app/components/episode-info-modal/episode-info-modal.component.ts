import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { IEpisode } from 'src/app/interfaces/episode.interface';

@Component({
  selector: 'app-episode-info-modal',
  templateUrl: './episode-info-modal.component.html',
  styleUrls: ['./episode-info-modal.component.scss'],
  standalone: true,
  imports: [IonIcon, IonContent, DatePipe],
})
export class EpisodeInfoModalComponent implements OnInit {
  @Input() episode!: IEpisode;
  constructor() {}

  ngOnInit() {}
}
