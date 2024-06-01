import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MiniPlayerComponent } from './mini-player.component';

describe('MiniPlayerComponent', () => {
  let component: MiniPlayerComponent;
  let fixture: ComponentFixture<MiniPlayerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MiniPlayerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MiniPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
