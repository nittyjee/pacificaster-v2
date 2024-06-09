import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlayerWaveformComponent } from './player-waveform.component';

describe('PlayerWaveformComponent', () => {
  let component: PlayerWaveformComponent;
  let fixture: ComponentFixture<PlayerWaveformComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PlayerWaveformComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerWaveformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
