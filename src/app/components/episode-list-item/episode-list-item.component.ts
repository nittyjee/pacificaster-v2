import { Component, Input, OnInit, inject } from '@angular/core';
import { IEpisode } from 'src/app/interfaces/episode.interface';
import { IonButton, IonIcon, ModalController } from '@ionic/angular/standalone';
import { DatePipe } from '@angular/common';
import { EpisodeInfoModalComponent } from '../episode-info-modal/episode-info-modal.component';
import { PlayerService } from 'src/app/services/player.service';
import { PlayButtonComponent } from '../play-button/play-button.component';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';

@Component({
  selector: 'app-episode-list-item',
  templateUrl: './episode-list-item.component.html',
  styleUrls: ['./episode-list-item.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonIcon,
    DatePipe,
    EpisodeInfoModalComponent,
    PlayButtonComponent,
    ThumbnailComponent,
  ],
})
export class EpisodeListItemComponent implements OnInit {
  @Input() episode!: IEpisode;

  private player = inject(PlayerService);

  isDescriptionExpanded = false;
  isModalOpen = false;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  onDescription() {
    if (this.isDescriptionExpanded && !this.isModalOpen) {
      this.openModal();
    } else {
      this.isDescriptionExpanded = true;
    }
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: EpisodeInfoModalComponent,
      breakpoints: [0, 0.7, 1],
      initialBreakpoint: 0.7,
      handleBehavior: 'cycle',
      cssClass: 'episode-info-modal',
      componentProps: {
        episode: this.episode,
      },
    });
    modal.present();

    modal.addEventListener('ionModalDidPresent', () => {
      this.isModalOpen = true;
      this.isDescriptionExpanded = false;
    });

    modal.addEventListener('ionModalDidDismiss', () => {
      this.isModalOpen = false;
    });

    const { data, role } = await modal.onWillDismiss();
  }
}
