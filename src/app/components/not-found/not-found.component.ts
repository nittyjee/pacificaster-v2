import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon],
})
export class NotFoundComponent {
  @Input() itemType: string = 'Item';

  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }
}
