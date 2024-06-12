import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-player-waveform',
  templateUrl: './player-waveform.component.html',
  styleUrls: ['./player-waveform.component.scss'],
  standalone: true,
})
export class PlayerWaveformComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas')
  canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  player = inject(PlayerService);

  arrayBuffer!: ArrayBuffer;

  audioDuration: number = 0;

  audioBuffer: any;

  moveInterval!: any;

  isSeeking = false;

  private audioContext: AudioContext;

  constructor() {
    this.audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
  }

  ngOnInit() {
    // const wavesurfer = WaveSurfer.create({
    //   container: '#waveform',
    //   waveColor: 'rgb(255, 255, 255)',
    //   progressColor: 'rgba(255, 255, 255, .4)',
    //   url: 'assets/audio.mp3',
    //   //   backend: 'MediaElement',
    //   //   media: (this.player.howl as any)._sounds[0]._node,
    //   dragToSeek: true,
    //   minPxPerSec: 10,
    //   autoCenter: true,
    //   fillParent: true,
    //   autoScroll: true,
    //   hideScrollbar: true,
    //   cursorWidth: 2,
    //   cursorColor: '#3880ff',
    //   mediaControls: false,
    //   fetchParams: {
    //     mode: 'no-cors',
    //   },
    // });
    // wavesurfer.on('ready', () => {
    //   wavesurfer.setMuted(true);
    //   wavesurfer.play();
    // });
  }

  ngAfterViewInit(): void {
    this.ctx = this.canvas?.nativeElement?.getContext(
      '2d'
    ) as CanvasRenderingContext2D;
    this.fetchAudioAsArrayBuffer(this.player.currentEpisode().audio_url).then(
      (arrayBuffer) => {
        this.arrayBuffer = arrayBuffer;
        this.decodeAudioData(arrayBuffer);
      }
    );
  }

  async fetchAudioAsArrayBuffer(url: string): Promise<ArrayBuffer> {
    const response = await fetch(
      'assets/audio.mp3',

      { credentials: 'omit' }
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.arrayBuffer();
  }

  async decodeAudioData(arrayBuffer: ArrayBuffer) {
    try {
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.audioBuffer = audioBuffer;
      console.log(this.audioBuffer);

      this.drawWaveform(audioBuffer);
    } catch (error) {
      console.error('Error decoding audio data:', error);
    }
  }

  drawWaveform(audioBuffer: AudioBuffer) {
    const scale = 10;
    const margin = 1;

    this.audioDuration = this.player.howl.duration();

    const { width, height } = this.canvas.nativeElement;

    this.canvas.nativeElement.width = this.audioDuration * scale;
    const centerHeight = Math.ceil(height / 2);
    const scaleFactor = (height - margin * 2) / 2;
    const float32Array = audioBuffer.getChannelData(0);
    const array = [];
    const length = float32Array.length;
    console.log('buffer size = ', float32Array.length);
    let i = 0;
    const chunkSize = Math.ceil(
      float32Array.length / (this.audioDuration * scale)
    );
    console.log('Chunk size ', chunkSize);
    while (i < length) {
      array.push(
        float32Array.slice(i, (i += chunkSize)).reduce((total, value) => {
          return Math.max(total, Math.abs(value));
        })
      );
    }
    console.log('Array length = ', array.length);
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
    this.canvas.nativeElement.setAttribute('style', 'height:100px;opacity:1;');
    this.moveWave();
  }

  moveWave() {
    clearInterval(this.moveInterval); // Clear any existing interval
    this.moveInterval = setInterval(() => {
      const currentTime = this.player.currentTime;

      if (!this.isSeeking) {
        // Only move the waveform when not seeking

        const margin = currentTime * 10 * this.player.speed;
        this.canvas.nativeElement.setAttribute(
          'style',
          'margin-left: -' + margin + 'px'
        );
      }
    }, 100);
  }
}
