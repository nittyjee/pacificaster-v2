import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tabbar',
  templateUrl: './tabbar.component.html',
  styleUrls: ['./tabbar.component.scss'],
  standalone: true,
  imports: [IonIcon, RouterLink],
})
export class TabbarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
