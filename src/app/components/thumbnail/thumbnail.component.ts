import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonImg } from '@ionic/angular/standalone';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss'],
  standalone: true,
  imports: [IonImg, NgClass],
})
export class ThumbnailComponent implements OnInit {
  @Input() src!: string;
  @Input() alt!: string;
  @Input() size: 'small' | 'medium' | 'auto' = 'auto';

  constructor() {}

  ngOnInit() {}
}
