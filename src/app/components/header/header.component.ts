import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonButton,
  IonMenuButton,
} from '@ionic/angular/standalone';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonIcon,
    IonButton,
    IonMenuButton,
    RouterLink,
  ],
})
export class HeaderComponent implements OnInit {
  isMobile = window.innerWidth < 768;
  constructor() {}

  ngOnInit() {}
}
