import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  constructor() {}

  isMobile(): boolean {
    return window.innerWidth < 768; // Example threshold for mobile
  }
}
