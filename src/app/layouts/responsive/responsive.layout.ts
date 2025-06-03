import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
    IonButton,
    IonIcon,
    IonMenu,
    IonMenuToggle,
    IonRouterOutlet,
    IonSplitPane,
} from '@ionic/angular/standalone';
import { filter, Subscription } from 'rxjs';
import { PlayerService } from 'src/app/services/player.service';
import { ScreenSizeService } from '../../services/screen-size.service';

@Component({
    selector: 'app-responsive-layout',
    templateUrl: './responsive.layout.html',
    styleUrls: ['./responsive.layout.scss'],
    standalone: true,
    imports: [
        IonRouterOutlet,
        IonSplitPane,
        IonMenu,
        IonIcon,
        IonButton,
        IonMenuToggle,
        RouterLink,
        RouterLinkActive
    ],
})
export class ResponsiveLayout implements OnInit, OnDestroy {
    public router = inject(Router);
    public player = inject(PlayerService);
    private screenSizeService = inject(ScreenSizeService);
    private cdr = inject(ChangeDetectorRef);

    showSidebar = false;
    private subscriptions: Subscription[] = [];

    menuItems = [
        {
            title: 'About',
            icon: 'information-circle-outline',
            link: '/about',
        },
        {
            title: 'Contacts',
            icon: 'call-outline',
            link: '/contacts',
        },
        {
            title: 'Apply',
            icon: 'document-outline',
            link: '/apply',
        },
    ];

    constructor() { }

    ngOnInit() {
        // Subscribe to router events
        const routerSub = this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event: any) => {
                if (
                    event.url.includes('podcast-sidebar') ||
                    event.url.includes('affiliate-sidebar')
                ) {
                    this.showSidebar = true;
                } else {
                    this.showSidebar = false;
                }
            });

        // Subscribe to screen size changes
        const screenSizeSub = this.screenSizeService.isMobile$().subscribe(() => {
            this.cdr.detectChanges();
        });

        this.subscriptions.push(routerSub, screenSizeSub);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    get isMobile(): boolean {
        return this.screenSizeService.isMobile();
    }
}
