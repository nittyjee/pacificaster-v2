import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  IonSplitPane,
  IonMenu,
  IonRouterOutlet,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { filter } from 'rxjs';

@Component({
  selector: 'app-desktop-layout',
  templateUrl: './desktop.layout.html',
  styleUrls: ['./desktop.layout.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonRouterOutlet,
    IonSplitPane,
    IonMenu,
  ],
})
export class DesktopLayout implements OnInit {
  public router = inject(Router);

  showSidebar = false;

  constructor() {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.url.includes('podcast-sidebar')) {
          this.showSidebar = true;
        } else {
          this.showSidebar = false;
        }
      });
  }
}
