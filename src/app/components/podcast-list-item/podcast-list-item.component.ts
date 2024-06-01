import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonCardTitle,
} from '@ionic/angular/standalone';
import { IPodcast } from 'src/app/interfaces/podcast.interface';

@Component({
  selector: 'app-podcast-list-item',
  templateUrl: './podcast-list-item.component.html',
  styleUrls: ['./podcast-list-item.component.scss'],
  standalone: true,
  imports: [
    IonCardTitle,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardContent,
    RouterLink,
  ],
})
export class PodcastListItemComponent implements OnInit {
  @Input() podcast!: IPodcast;

  constructor() {}

  ngOnInit() {}
}
