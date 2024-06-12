import { Component, Input, OnInit, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
} from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSplitPane,
  IonMenu,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { filter } from 'rxjs';
import { PodcastListComponent } from 'src/app/components/podcast-list/podcast-list.component';
import { PodcastService } from 'src/app/services/podcast.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonSplitPane,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    PodcastListComponent,
    IonRouterOutlet,
  ],
})
export class HomePage implements OnInit {
  public podcastService = inject(PodcastService);
  public router = inject(Router);

  showSidebar = false;

  constructor() {}

  ngOnInit(): void {
    this.podcastService.fetchPodcasts();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        console.log('NavigationEnd event:', event);

        if (event.url.includes('podcast-sidebar')) {
          this.showSidebar = true;
        } else {
          this.showSidebar = false;
        }
      });
  }
}
