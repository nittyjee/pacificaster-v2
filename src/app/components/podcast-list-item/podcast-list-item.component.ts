import { Component, Input, OnInit } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';
import { IPodcast } from 'src/app/interfaces/podcast.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-podcast-list-item',
  templateUrl: './podcast-list-item.component.html',
  styleUrls: ['./podcast-list-item.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, ThumbnailComponent],
})
export class PodcastListItemComponent implements OnInit {
  @Input() podcast!: IPodcast;

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
