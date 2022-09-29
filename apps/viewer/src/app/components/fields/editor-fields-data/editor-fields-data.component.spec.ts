import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorFieldsDataComponent } from './editor-fields-data.component';

describe('EditorFieldsDataComponent', () => {
  let component: EditorFieldsDataComponent;
  let fixture: ComponentFixture<EditorFieldsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorFieldsDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorFieldsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
