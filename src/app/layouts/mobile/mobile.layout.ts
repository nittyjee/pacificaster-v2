import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-mobile-layout',
  templateUrl: './mobile.layout.html',
  styleUrls: ['./mobile.layout.scss'],
  standalone: true,
  imports: [IonRouterOutlet],
})
export class MobileLayout implements OnInit {
  constructor() {}

  ngOnInit() {}
}
