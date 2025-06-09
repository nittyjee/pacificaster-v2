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
    data: {
      isSidebar: true,
    }
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
    data: {
      isSidebar: true,
    }
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
  {
    path: ':affiliateId',
    loadComponent: () =>
      import('./pages/affiliate-detail/affiliate-detail.page').then(
        (m) => m.AffiliateDetailPage
      ),
  }
];

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/responsive/responsive.layout').then((m) => m.ResponsiveLayout),
    children: childRoutes,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
