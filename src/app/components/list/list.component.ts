import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonList,
  IonRow
} from '@ionic/angular/standalone';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [
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
