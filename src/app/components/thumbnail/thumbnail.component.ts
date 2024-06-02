import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss'],
  standalone: true,
})
export class ThumbnailComponent implements OnInit {
  @Input() src!: string;

  constructor() {}

  ngOnInit() {}
}
