import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  private mobileBreakpoint = 768;
  private isMobileSubject = new BehaviorSubject<boolean>(this.checkIsMobile());

  constructor() {
    // Listen for window resize events
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => {
        this.isMobileSubject.next(this.checkIsMobile());
      });
    }
  }

  isMobile(): boolean {
    return this.checkIsMobile();
  }

  isMobile$(): Observable<boolean> {
    return this.isMobileSubject.asObservable();
  }

  private checkIsMobile(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.innerWidth < this.mobileBreakpoint;
  }
}
