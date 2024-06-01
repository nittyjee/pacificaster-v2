import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EpisodeListItemComponent } from './episode-list-item.component';

describe('EpisodeListItemComponent', () => {
  let component: EpisodeListItemComponent;
  let fixture: ComponentFixture<EpisodeListItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EpisodeListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EpisodeListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
