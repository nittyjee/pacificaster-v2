import { Routes } from '@angular/router';

const childRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
    children: [
      {
        path: 'podcast-sidebar/:podcastId',
        loadComponent: () =>
          import('./pages/podcast-detail/podcast-detail.page').then(
            (m) => m.PodcastDetailPage
          ),
      },
    ],
  },
  {
    path: 'podcast/:podcastId',
    loadComponent: () =>
      import('./pages/podcast-detail/podcast-detail.page').then(
        (m) => m.PodcastDetailPage
      ),
  },
];

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/mobile/mobile.layout').then((m) => m.MobileLayout),
    children: childRoutes,
  },
  {
    path: 'desktop',
    loadComponent: () =>
      import('./layouts/desktop/desktop.layout').then((m) => m.DesktopLayout),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'podcast/:podcastId',
        outlet: 'detail',
        loadComponent: () =>
          import('./pages/podcast-detail/podcast-detail.page').then(
            (m) => m.PodcastDetailPage
          ),
      },
    ],
  },
];
