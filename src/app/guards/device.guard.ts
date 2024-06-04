import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DeviceGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const deviceType = next.data['device'];
    const isDesktop = window.innerWidth > 768;

    if (
      (deviceType === 'desktop' && isDesktop) ||
      (deviceType === 'mobile' && !isDesktop)
    ) {
      return true;
    }

    if (isDesktop) {
      this.router.navigate(['']); // Navigate to desktop layout
    } else {
      this.router.navigate(['']); // Navigate to mobile layout
    }

    return false;
  }
}
