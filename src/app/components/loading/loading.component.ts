import { Component, Input } from '@angular/core';
import { IonSpinner } from '@ionic/angular/standalone';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
    standalone: true,
    imports: [IonSpinner],
})
export class LoadingComponent {
    @Input() message: string = 'Loading...';
    @Input() spinnerType: 'lines' | 'bubbles' | 'circles' | 'crescent' | 'dots' = 'circles';

    constructor() { }
}
