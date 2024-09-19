import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IonCol,
  IonGrid,
  IonRow,
  IonSearchbar,
  IonIcon,
  IonButton,
  IonList,
  IonItem,
} from '@ionic/angular/standalone';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [
    IonSearchbar,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonButton,
    ListItemComponent,
    IonList,
    IonItem,
  ],
})
export class ListComponent implements OnInit {
  @Input() title!: string;
  @Input() items!: any[];
  @Input() showToggle = false;
  @Input() isList = false;
  @Output() layoutChanged = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  toggleLayout() {
    this.layoutChanged.emit(!this.isList);
  }
}
