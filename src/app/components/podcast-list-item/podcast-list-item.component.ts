import { Component, Input, OnInit, inject } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';
import { IPodcast } from 'src/app/interfaces/podcast.interface';
import { Router } from '@angular/router';
import { ScreenSizeService } from 'src/app/services/screen-size.service';

@Component({
  selector: 'app-podcast-list-item',
  templateUrl: './podcast-list-item.component.html',
  styleUrls: ['./podcast-list-item.component.scss'],
  standalone: true,
  imports: [ThumbnailComponent],
})
export class PodcastListItemComponent implements OnInit {
  @Input() podcast!: IPodcast;

  private router = inject(Router);
  private screenSizeService = inject(ScreenSizeService);

  constructor() { }

  ngOnInit() {}

  onClick() {
    if (this.screenSizeService.isMobile()) {
      this.router.navigate(['podcast', this.podcast.uuid]);
    } else {
      this.router.navigate([
        { outlets: { sidebar: ['podcast-sidebar', this.podcast.uuid] } },
      ]);
    }
  }
}
