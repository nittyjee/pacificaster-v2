import { Routes } from '@angular/router';

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
    path: 'affiliate-sidebar/:affiliateId',
    outlet: 'sidebar',
    loadComponent: () =>
      import('./pages/affiliate-detail/affiliate-detail.page').then(
        (m) => m.AffiliateDetailPage
      ),
  },
  {
    path: 'affiliate/:affiliateId',
    loadComponent: () =>
      import('./pages/affiliate-detail/affiliate-detail.page').then(
        (m) => m.AffiliateDetailPage
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
