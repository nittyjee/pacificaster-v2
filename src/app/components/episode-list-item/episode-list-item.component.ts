import { Component, Input, OnInit, inject } from '@angular/core';
import { IEpisode } from 'src/app/interfaces/episode.interface';
import { IonButton, IonIcon, ModalController } from '@ionic/angular/standalone';
import { DatePipe } from '@angular/common';
import { EpisodeInfoModalComponent } from '../episode-info-modal/episode-info-modal.component';
import { PlayerService } from 'src/app/services/player.service';
import { PlayButtonComponent } from '../play-button/play-button.component';

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
  ],
})
export class EpisodeListItemComponent implements OnInit {
  @Input() episode!: IEpisode;

  private player = inject(PlayerService);

  isDescriptionExpanded = false;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  onDescription() {
    if (this.isDescriptionExpanded) {
      this.openModal();
    } else {
      this.isDescriptionExpanded = true;
    }
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: EpisodeInfoModalComponent,
      breakpoints: [0, 0.75],
      initialBreakpoint: 0.75,
      componentProps: {
        episode: this.episode,
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
    }

    modal.onDidDismiss().then((data) => {
      this.isDescriptionExpanded = false;
    });
  }
}
