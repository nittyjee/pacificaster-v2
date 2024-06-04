import { Component, OnInit } from '@angular/core';
import {
  IonSplitPane,
  IonMenu,
  IonRouterOutlet,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-desktop-layout',
  templateUrl: './desktop.layout.html',
  styleUrls: ['./desktop.layout.scss'],
  standalone: true,
  imports: [IonRouterOutlet, IonSplitPane, IonMenu],
})
export class DesktopLayout implements OnInit {
  constructor() {}

  ngOnInit() {}
}
