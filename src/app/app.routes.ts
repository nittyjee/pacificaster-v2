import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: ':podcastId',
    loadComponent: () =>
      import('./pages/podcast-detail/podcast-detail.page').then(
        (m) => m.PodcastDetailPage
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
];
