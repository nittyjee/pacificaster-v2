import { Component, Input, OnInit } from '@angular/core';
import {
  IonList,
  IonItem,
  IonLabel,
  IonListHeader,
} from '@ionic/angular/standalone';
import { IEpisode } from 'src/app/interfaces/episode.interface';
import { EpisodeListItemComponent } from '../episode-list-item/episode-list-item.component';

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonItem,
    IonList,
    IonListHeader,
    EpisodeListItemComponent,
  ],
})
export class EpisodeListComponent implements OnInit {
  @Input() episodes!: IEpisode[];
  constructor() {}

  ngOnInit() {}
}
