import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { IonContent, IonImg } from '@ionic/angular/standalone';

@Component({
  selector: 'about-page',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [IonContent, IonImg, HeaderComponent],
})
export class AboutPage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
