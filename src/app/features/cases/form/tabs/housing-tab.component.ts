import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-housing-tab',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  template: `
    <div class="tab-content" [formGroup]="form()">
      <div class="section-card">
        <div class="section-header">
          <mat-icon>home</mat-icon>
          <h3>السكن</h3>
        </div>
        <div class="section-body">
          <div class="form-grid">
            <mat-form-field appearance="outline" class="form-field">
              <mat-label>نوع السكن</mat-label>
              <mat-select formControlName="housingType">
                <mat-option value="rent">إيجار</mat-option>
                <mat-option value="owned">تمليك</mat-option>
              </mat-select>
              @if (form().controls['housingType'].hasError('required')) {
                <mat-error>نوع السكن مطلوب</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>اسم المالك</mat-label>
              <input matInput formControlName="ownershipName">
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>نوع المنزل</mat-label>
              <mat-select formControlName="houseType">
                <mat-option value="family">عائلة</mat-option>
                <mat-option value="private">خاص</mat-option>
              </mat-select>
              @if (form().controls['houseType'].hasError('required')) {
                <mat-error>نوع المنزل مطلوب</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>مساحة المنزل (م²)</mat-label>
              <input matInput type="number" formControlName="houseArea">
              @if (form().controls['houseArea'].hasError('required')) {
                <mat-error>مساحة المنزل مطلوبة</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>عدد الطوابق</mat-label>
              <input matInput type="number" formControlName="numberOfFloors">
              @if (form().controls['numberOfFloors'].hasError('required')) {
                <mat-error>عدد الطوابق مطلوب</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>عدد الغرف</mat-label>
              <input matInput type="number" formControlName="numberOfRooms">
              @if (form().controls['numberOfRooms'].hasError('required')) {
                <mat-error>عدد الغرف مطلوب</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>نوع السقف</mat-label>
              <input matInput formControlName="roofType">
              @if (form().controls['roofType'].hasError('required')) {
                <mat-error>نوع السقف مطلوب</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>نوع الجدران</mat-label>
              <input matInput formControlName="wallsType">
              @if (form().controls['wallsType'].hasError('required')) {
                <mat-error>نوع الجدران مطلوب</mat-error>
              }
            </mat-form-field>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HousingTabComponent {
  form = input.required<FormGroup>();
}

