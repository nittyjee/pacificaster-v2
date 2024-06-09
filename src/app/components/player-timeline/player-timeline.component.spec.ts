import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlayerTimelineComponent } from './player-timeline.component';

describe('PlayerTimelineComponent', () => {
  let component: PlayerTimelineComponent;
  let fixture: ComponentFixture<PlayerTimelineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PlayerTimelineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
