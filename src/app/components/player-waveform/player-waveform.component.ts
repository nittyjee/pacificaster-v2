import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
  inject,
} from '@angular/core';
import type { GestureDetail } from '@ionic/angular/standalone';
import { GestureController } from '@ionic/angular/standalone';
import { TimelinePipe } from 'src/app/pipes/timeline.pipe';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-waveform',
  templateUrl: './player-waveform.component.html',
  styleUrls: ['./player-waveform.component.scss'],
  standalone: true,
  imports: [TimelinePipe],
})
export class PlayerWaveformComponent implements AfterViewInit, OnChanges {
  @Input() totalDuration?: number;
  @Input() inLimitedSpace: boolean = false;

  @ViewChild('canvas')
  canvas?: ElementRef<HTMLCanvasElement>;
  @ViewChild('waveformContainer')
  waveformContainer!: ElementRef;
  private ctx!: CanvasRenderingContext2D;

  player = inject(PlayerService);

  arrayBuffer!: ArrayBuffer;

  audioDuration: number = 0;

  audioBuffer: any;

  moveInterval!: any;

  seek = 0;

  translationOrigin!: number;

  height = 100;

  constructor(
    private el: ElementRef,
    private gestureCtrl: GestureController,
    private cdRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.ctx = this.canvas?.nativeElement?.getContext(
      '2d'
    ) as CanvasRenderingContext2D;

    this.drawRandomWaveform();

    const gesture = this.gestureCtrl.create({
      el: this.el.nativeElement.closest('app-player-modal'),
      onStart: () => this.onStart(),
      onMove: (detail) => this.onMove(detail),
      onEnd: () => this.onEnd(),
      threshold: 10,
      gestureName: 'example',
    });

    gesture.enable();
  }

  ngOnChanges(): void {
    this.height = this.inLimitedSpace ? 60 : 100;
    if (this.totalDuration) {
      this.drawRandomWaveform();
    }
  }

  drawRandomWaveform() {
    if (this.canvas) {
      let duration = this.player.totalDuration;

      const scale = 10;
      const margin = 1;

      const { width, height } = this.canvas.nativeElement;

      this.canvas.nativeElement.width = duration * scale;
      const centerHeight = Math.ceil(height / 2);
      const scaleFactor = (height - margin * 2) / 2;

      // Generate random values
      const array = [];
      const totalPoints = duration * scale;
      for (let i = 0; i < totalPoints; i++) {
        array.push(Math.random()); // Random values between 0 and 1
      }

      let x = 0;
      for (let k = 0; k < array.length; k += 2) {
        this.ctx.fillStyle = '#76bde7';
        this.ctx.fillRect(
          x,
          centerHeight - array[k] * scaleFactor,
          1,
          array[k] * scaleFactor * 2
        );
        x += 2;
      }

      this.moveWave();
    }
  }

  moveWave() {
    clearInterval(this.moveInterval); // Clear any existing interval
    this.moveInterval = setInterval(() => {
      if (!this.player.isSeeking && this.canvas) {
        // Only move the waveform when not seeking
        const margin = Math.floor(
          this.player.currentTime * 10 * this.player.speed
        );
        // this.waveformContainer.nativeElement.style.marginLeft = margin + 'px';

        this.canvas.nativeElement.setAttribute('position', margin.toString());

        this.canvas.nativeElement.style.transform =
          'translateX(-' + margin + 'px)';
      }
    }, 1000);
  }

  private onStart() {
    this.player.startSeeking(this.player.currentTime);

    if (this.player.isPlaying()) {
      this.translationOrigin = parseInt(
        this.canvas?.nativeElement.getAttribute('position') ?? '0'
      );
      // seek is not working if it is pause. mute is better
      // this.player.pause();

      clearInterval(this.moveInterval);

      this.cdRef.detectChanges();
    }
  }

  private onMove({ deltaX }: GestureDetail) {
    if (this.player.isSeeking && this.canvas) {
      this.seek = Math.floor((deltaX * -1) / 10);

      let translation = this.translationOrigin + deltaX * -1;

      this.canvas.nativeElement.style.transform =
        'translateX(-' + translation + 'px)';

      this.cdRef.detectChanges();
    }
  }

  private onEnd() {
    if (this.player.isSeeking) {
      this.player.continue();
      this.player.endSeeking(this.seek);
      this.moveWave();
      this.cdRef.detectChanges();
    }
  }
}
