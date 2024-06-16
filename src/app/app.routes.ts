import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ScreenSizeService } from './services/screen-size.service';

const childRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'podcast-sidebar/:podcastId',
    outlet: 'sidebar',
    loadComponent: () =>
      import('./pages/podcast-detail/podcast-detail.page').then(
        (m) => m.PodcastDetailPage
      ),
  },
  {
    path: 'podcast/:podcastId',
    loadComponent: () =>
      import('./pages/podcast-detail/podcast-detail.page').then(
        (m) => m.PodcastDetailPage
      ),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.page').then((m) => m.AboutPage),
  },
  {
    path: 'contacts',
    loadComponent: () =>
      import('./pages/contacts/contacts.page').then((m) => m.ContactsPage),
  },
  {
    path: 'apply',
    loadComponent: () =>
      import('./pages/apply/apply.page').then((m) => m.ApplyPage),
  },
];

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'mobile',
    pathMatch: 'full',
  },
  {
    path: 'mobile',

    loadComponent: () =>
      import('./layouts/mobile/mobile.layout').then((m) => m.MobileLayout),

    children: childRoutes,
  },
  {
    path: 'desktop',
    loadComponent: () =>
      import('./layouts/desktop/desktop.layout').then((m) => m.DesktopLayout),
    children: childRoutes,
  },
];

export function getRoutes(screenSizeService: ScreenSizeService) {
  [
    {
      path: '',
      redirectTo: 'mobile',
      pathMatch: 'full',
    },
    {
      path: 'mobile',

      loadComponent: () =>
        import('./layouts/mobile/mobile.layout').then((m) => m.MobileLayout),

      children: childRoutes,
    },
    {
      path: 'desktop',
      loadComponent: () =>
        import('./layouts/desktop/desktop.layout').then((m) => m.DesktopLayout),
      children: childRoutes,
    },
  ];
}
