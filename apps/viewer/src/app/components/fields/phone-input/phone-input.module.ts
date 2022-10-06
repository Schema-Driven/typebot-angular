import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhoneInputComponent } from './phone-input.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PhoneInputComponent],
  imports: [CommonModule, ReactiveFormsModule, ReactiveFormsModule],
  exports: [PhoneInputComponent],
})
export class PhoneInputModule {}
