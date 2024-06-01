import { Component, Input, OnInit } from '@angular/core';
import { IPodcast } from 'src/app/interfaces/podcast.interface';
import { IonIcon, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-podcast-info-modal',
  templateUrl: './podcast-info-modal.component.html',
  styleUrls: ['./podcast-info-modal.component.scss'],
  standalone: true,
  imports: [IonIcon, IonContent],
})
export class PodcastInfoModalComponent implements OnInit {
  @Input() podcast!: IPodcast;

  constructor() {}

  ngOnInit() {}
}
