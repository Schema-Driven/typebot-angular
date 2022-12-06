import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioFieldComponent } from './audio-field.component';

describe('AudioFieldComponent', () => {
  let component: AudioFieldComponent;
  let fixture: ComponentFixture<AudioFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
