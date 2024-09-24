import { Component, Input, OnInit } from '@angular/core';
import {
  IonList,
  IonItem,
  IonLabel,
  IonListHeader,
  IonIcon,
} from '@ionic/angular/standalone';
import { PodcastListItemComponent } from '../podcast-list-item/podcast-list-item.component';
import { IPodcast } from 'src/app/interfaces/podcast.interface';

@Component({
  selector: 'app-podcast-list',
  templateUrl: './podcast-list.component.html',
  styleUrls: ['./podcast-list.component.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonItem,
    IonList,
    IonListHeader,
    IonIcon,
    PodcastListItemComponent,
  ],
})
export class PodcastListComponent implements OnInit {
  @Input() podcasts: IPodcast[] = [];

  constructor() {}

  ngOnInit() {}
}
