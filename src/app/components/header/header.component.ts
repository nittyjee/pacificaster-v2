import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { ScreenSizeService } from '../../services/screen-size.service';
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
    IonMenuButton,
    RouterLink,
  ],
})
export class HeaderComponent implements OnInit {
  private screenSizeService = inject(ScreenSizeService);

  constructor() {}

  ngOnInit() {}

  get isMobile(): boolean {
    return this.screenSizeService.isMobile();
  }
}
