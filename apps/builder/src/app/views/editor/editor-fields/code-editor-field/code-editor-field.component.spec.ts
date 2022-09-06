import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeEditorFieldComponent } from './code-editor-field.component';

describe('CodeEditorFieldComponent', () => {
  let component: CodeEditorFieldComponent;
  let fixture: ComponentFixture<CodeEditorFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeEditorFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeEditorFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
