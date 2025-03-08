import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-truncator',
  templateUrl: './title-truncator.component.html',
  styleUrls: ['./title-truncator.component.scss'],
  standalone: true,
})
export class TitleTruncatorComponent implements OnInit, OnChanges {
  @Input({ required: true }) title!: string;
  @Input() maxLength: number = 50;
  @Input() alwaysShowFull: boolean = false;

  constructor() {}

  showFull: boolean = false;
  fullTitle: string = '';
  isTruncated: boolean = false;
  longEnoughToBeTrunkated: boolean = false;

  ngOnInit() {
    this.fullTitle = this.title;
    this.updateDisplay();
  }

  ngOnChanges() {
    this.fullTitle = this.title;
    this.longEnoughToBeTrunkated = this.title.length > this.maxLength;
    this.updateDisplay();
  }

  get displayText(): string {
    if (this.showFull || !this.isTruncated || this.alwaysShowFull) {
      return this.fullTitle;
    }
    return this.fullTitle.substring(0, this.maxLength) + '...';
  }

  toggleTruncate() {
    if (this.isTruncated) {
      this.showFull = !this.showFull;
    }
  }

  private updateDisplay() {
    this.isTruncated = this.fullTitle.length > this.maxLength;
    if (!this.isTruncated) {
      this.showFull = false;
    }
  }
}
