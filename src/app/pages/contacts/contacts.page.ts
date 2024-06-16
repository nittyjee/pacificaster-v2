import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/angular/standalone';

@Component({
  selector: 'contacts-page',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
  standalone: true,
  imports: [IonCardTitle, IonCardHeader, IonCard, IonContent, HeaderComponent],
})
export class ContactsPage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
