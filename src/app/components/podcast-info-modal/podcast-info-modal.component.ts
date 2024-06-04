import { Component, Input, OnInit } from '@angular/core';
import { IPodcast } from 'src/app/interfaces/podcast.interface';
import {
  IonIcon,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  ModalController,
} from '@ionic/angular/standalone';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';

@Component({
  selector: 'app-podcast-info-modal',
  templateUrl: './podcast-info-modal.component.html',
  styleUrls: ['./podcast-info-modal.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    ThumbnailComponent,
  ],
})
export class PodcastInfoModalComponent implements OnInit {
  @Input() podcast!: IPodcast;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  setOpen(isOpen: boolean) {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
