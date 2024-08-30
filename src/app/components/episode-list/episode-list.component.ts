import { Component, Input, OnInit } from '@angular/core';
import {
  IonList,
  IonItem,
  IonLabel,
  IonListHeader,
  IonIcon,
  IonButton,
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
    IonIcon,
    IonButton,
    EpisodeListItemComponent,
  ],
})
export class EpisodeListComponent implements OnInit {
  @Input() episodes: IEpisode[] = []; // This is necessary if you are passing episode data to this component

  constructor() {}

  ngOnInit() {} // Lifecycle hook, kept from the original

  // This method handles copying the RSS link to the clipboard
  copyRssLink(event: Event, rssUrl: string): void {
    event.preventDefault(); // Prevents the default anchor link behavior
    const tempInput = document.createElement('input');
    tempInput.value = rssUrl;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    alert('RSS feed link copied to clipboard!');
  }
}
