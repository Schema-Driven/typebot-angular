import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorFieldsComponent } from './editor-fields.component';

describe('EditorFieldsComponent', () => {
  let component: EditorFieldsComponent;
  let fixture: ComponentFixture<EditorFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorFieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
