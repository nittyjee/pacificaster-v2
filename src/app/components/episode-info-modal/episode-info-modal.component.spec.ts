import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EpisodeInfoModalComponent } from './episode-info-modal.component';

describe('EpisodeInfoModalComponent', () => {
  let component: EpisodeInfoModalComponent;
  let fixture: ComponentFixture<EpisodeInfoModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EpisodeInfoModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EpisodeInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
