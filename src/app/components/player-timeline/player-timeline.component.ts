import { Component, Input, OnInit, inject } from '@angular/core';
import { IonRange } from '@ionic/angular/standalone';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-timeline',
  templateUrl: './player-timeline.component.html',
  styleUrls: ['./player-timeline.component.scss'],
  standalone: true,
  imports: [IonRange],
})
export class PlayerTimelineComponent {
  isDragging = false;
  timelineBeforeDrag!: number;

  player = inject(PlayerService);

  onChange(event: any) {
    this.player.jump(event.detail.value);
  }

  onIonKnobMoveStart(ev: Event) {
    this.timelineBeforeDrag = this.player.currentTime;

    this.isDragging = true;
  }

  onIonKnobMoveEnd(ev: Event) {
    this.timelineBeforeDrag = this.player.currentTime;

    this.isDragging = false;
  }

  pinFormatter(value: number) {
    const seconds = value;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    let timeString = [hours, minutes, remainingSeconds]
      .map((v) => (v < 10 ? '0' + v : v))
      .join(':');

    // // If the hours are 0, return just MM:SS.
    // if (hours === 0) {
    //   timeString = timeString.substr(3);
    // }

    return timeString;
  }
}
