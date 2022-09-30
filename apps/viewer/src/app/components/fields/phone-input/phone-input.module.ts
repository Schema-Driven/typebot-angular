import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { PhoneInputComponent } from './phone-input.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PhoneInputComponent],
  imports: [
    CommonModule,
    NgxIntlTelInputModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule,
    ReactiveFormsModule,
  ],
  exports: [PhoneInputComponent],
})
export class PhoneInputModule {}
