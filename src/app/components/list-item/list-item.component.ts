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
import { IAffiliate } from 'src/app/interfaces/affiliate.interface';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
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
export class ListItemComponent {
  @Input() item!: IPodcast | IAffiliate;
  @Input() inList: boolean = false;

  constructor(private router: Router) {}

  onClick() {
    if (window.innerWidth > 768) {
      this.router.navigate([
        'desktop',
        { outlets: { sidebar: [this.item.type + '-sidebar', this.item.uuid] } },
      ]);
    } else {
      this.router.navigate(['mobile', this.item.type, this.item.uuid]);
    }
  }
}
