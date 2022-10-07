import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceInputComponent } from './choice-input.component';

describe('ChoiceInputComponent', () => {
  let component: ChoiceInputComponent;
  let fixture: ComponentFixture<ChoiceInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoiceInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
