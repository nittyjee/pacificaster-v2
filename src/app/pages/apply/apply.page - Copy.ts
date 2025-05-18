import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'apply-page',
  templateUrl: './apply.page.html',
  styleUrls: ['./apply.page.scss'],
  standalone: true,
  imports: [IonContent, HeaderComponent],
})
export class ApplyPage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
