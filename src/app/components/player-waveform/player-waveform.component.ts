import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import type { GestureDetail } from '@ionic/angular/standalone';
import { GestureController } from '@ionic/angular/standalone';
import { TimelinePipe } from 'src/app/pipes/timeline.pipe';

@Component({
  selector: 'app-player-waveform',
  templateUrl: './player-waveform.component.html',
  styleUrls: ['./player-waveform.component.scss'],
  standalone: true,
  imports: [TimelinePipe],
})
export class PlayerWaveformComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas')
  canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('waveformContainer')
  waveformContainer!: ElementRef;
  private ctx!: CanvasRenderingContext2D;

  player = inject(PlayerService);

  arrayBuffer!: ArrayBuffer;

  audioDuration: number = 0;

  audioBuffer: any;

  moveInterval!: any;

  isSeeking = false;
  seek = 0;

  translationOrigin!: number;

  constructor(
    private el: ElementRef,
    private gestureCtrl: GestureController,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.ctx = this.canvas?.nativeElement?.getContext(
      '2d'
    ) as CanvasRenderingContext2D;

    this.drawRandomWaveform();

    const gesture = this.gestureCtrl.create({
      el: this.el.nativeElement.closest('ion-content'),
      onStart: () => this.onStart(),
      onMove: (detail) => this.onMove(detail),
      onEnd: () => this.onEnd(),
      threshold: 10,
      gestureName: 'example',
    });

    gesture.enable();
  }

  drawRandomWaveform() {
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

  moveWave() {
    clearInterval(this.moveInterval); // Clear any existing interval
    this.moveInterval = setInterval(() => {
      if (!this.isSeeking) {
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
    if (this.player.isPlaying()) {
      this.isSeeking = true;

      this.translationOrigin = parseInt(
        this.canvas.nativeElement.getAttribute('position') ?? '0'
      );

      //this.player.pause();
      clearInterval(this.moveInterval);

      this.cdRef.detectChanges();
    }
  }

  private onMove({ deltaX, currentX, velocityX }: GestureDetail) {
    if (this.isSeeking) {
      this.seek = Math.floor((deltaX * -1) / 10);

      let translation = this.translationOrigin + deltaX * -1;

      this.canvas.nativeElement.style.transform =
        'translateX(-' + translation + 'px)';

      this.cdRef.detectChanges();
    }
  }

  private onEnd() {
    if (this.isSeeking) {
      this.player.seek(this.seek);

      this.isSeeking = false;
      this.player.contuniue();
      this.moveWave();
      this.cdRef.detectChanges();
    }
  }
}
