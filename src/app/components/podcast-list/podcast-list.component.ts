import { Component, Input, OnInit } from '@angular/core';
import {
  IonCol,
  IonGrid,
  IonRow,
  IonSearchbar,
  IonIcon,
  IonButton,
  IonList,
  IonItem,
} from '@ionic/angular/standalone';
import { PodcastListItemComponent } from '../podcast-list-item/podcast-list-item.component';

@Component({
  selector: 'app-podcast-list',
  templateUrl: './podcast-list.component.html',
  styleUrls: ['./podcast-list.component.scss'],
  standalone: true,
  imports: [
    IonSearchbar,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonButton,
    PodcastListItemComponent,
    IonList,
    IonItem,
  ],
})
export class PodcastListComponent implements OnInit {
  @Input() title!: string;
  @Input() podcasts!: any[];

  isList = false;

  constructor() {}

  ngOnInit() {}

  toggleLayout() {
    this.isList = !this.isList;
  }
}
