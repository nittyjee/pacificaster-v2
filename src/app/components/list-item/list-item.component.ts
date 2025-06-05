import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IAffiliate } from 'src/app/interfaces/affiliate.interface';
import { IPodcast } from 'src/app/interfaces/podcast.interface';
import { PodcastService } from 'src/app/services/podcast.service';
import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  standalone: true,
  imports: [
    ThumbnailComponent,
  ],
})
export class ListItemComponent {
  @Input() item!: IPodcast | IAffiliate;
  @Input() inList: boolean = false;

  private router = inject(Router);
  private screenSizeService = inject(ScreenSizeService);

  constructor() { }

  onClick() {
    if (this.item.type === 'affiliate') {
      this.router.navigate([PodcastService.makeNameURLReadable(this.item.title)]);
    } else {
      this.router.navigate([this.item.type, PodcastService.makeNameURLReadable(this.item.title)]);
    }
  }
}
