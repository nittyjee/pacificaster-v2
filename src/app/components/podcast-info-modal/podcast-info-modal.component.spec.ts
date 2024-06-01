import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PodcastInfoModalComponent } from './podcast-info-modal.component';

describe('PodcastInfoModalComponent', () => {
  let component: PodcastInfoModalComponent;
  let fixture: ComponentFixture<PodcastInfoModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PodcastInfoModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PodcastInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
