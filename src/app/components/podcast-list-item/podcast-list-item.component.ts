import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonCardTitle,
} from '@ionic/angular/standalone';
import { IPodcast } from 'src/app/interfaces/podcast.interface';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';

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
    ThumbnailComponent,
  ],
})
export class PodcastListItemComponent implements OnInit {
  @Input() podcast!: IPodcast;
  @Input() inList: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  onClick() {
    if (window.innerWidth > 768) {
      this.router.navigate([
        'desktop',
        { outlets: { sidebar: ['podcast-sidebar', this.podcast.uuid] } },
      ]);
    } else {
      this.router.navigate(['mobile', 'podcast', this.podcast.uuid]);
    }
  }
}
