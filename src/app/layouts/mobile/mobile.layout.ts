import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonRouterOutlet,
  IonIcon,
  IonButton,
  IonMenu,
  IonMenuToggle,
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-mobile-layout',
  templateUrl: './mobile.layout.html',
  styleUrls: ['./mobile.layout.scss'],
  standalone: true,
  imports: [
    IonRouterOutlet,
    IonIcon,
    IonButton,
    IonMenu,
    HeaderComponent,
    RouterLink,
    RouterLinkActive,
    IonMenuToggle,
  ],
})
export class MobileLayout implements OnInit {
  menuItems = [
    {
      title: 'About',
      icon: 'information-circle-outline',
      link: '/mobile/about',
    },
    {
      title: 'Contacts',
      icon: 'call-outline',
      link: '/mobile/contacts',
    },
    {
      title: 'Apply',
      icon: 'document-outline',
      link: '/mobile/apply',
    },
  ];
  constructor() {}

  ngOnInit() {}
}
