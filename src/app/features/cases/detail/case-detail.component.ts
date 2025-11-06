import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CaseService, CaseDetail } from '../../../core/services/case.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-case-detail',
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-container">
      @if (loading()) {
        <div class="loading-container">
          <mat-spinner diameter="48"></mat-spinner>
          <p>جار تحميل بيانات الحالة...</p>
        </div>
      } @else if (caseData()) {
        <!-- Header -->
        <div class="page-header">
          <div class="header-content">
            <div class="title-section">
              <h1 class="page-title">{{ caseData()!.basicData.fullName }}</h1>
              <div class="case-meta">
                <span class="case-code">{{ caseData()!.researcherInformation.caseCode }}</span>
                <span class="status-badge" [ngClass]="getStatusClass(caseData()!.caseManagement.status)">
                  {{ getStatusLabel(caseData()!.caseManagement.status) }}
                </span>
              </div>
            </div>
            <div class="header-actions">
              <button mat-stroked-button [routerLink]="['/cases']">
                <mat-icon>arrow_forward</mat-icon>
                <span>رجوع</span>
              </button>
              <button mat-flat-button color="primary" [routerLink]="['/cases', caseId(), 'edit']">
                <mat-icon>edit</mat-icon>
                <span>تعديل</span>
              </button>
              <button mat-stroked-button [routerLink]="['/cases', caseId(), 'print']">
                <mat-icon>print</mat-icon>
                <span>طباعة</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="content-grid">
          <!-- Researcher Information -->
          <div class="section-card">
            <div class="section-header">
              <mat-icon>person</mat-icon>
              <h3>معلومات الباحث</h3>
            </div>
            <div class="section-body">
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">اسم الباحث</span>
                  <span class="value">{{ caseData()!.researcherInformation.researcherName }}</span>
                </div>
                <div class="info-item">
                  <span class="label">اسم الدليل</span>
                  <span class="value">{{ caseData()!.researcherInformation.guideName }}</span>
                </div>
                <div class="info-item">
                  <span class="label">موبايل الدليل</span>
                  <span class="value">{{ caseData()!.researcherInformation.guideMobile }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Basic Data -->
          <div class="section-card">
            <div class="section-header">
              <mat-icon>badge</mat-icon>
              <h3>البيانات الأساسية</h3>
            </div>
            <div class="section-body">
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">الاسم الكامل</span>
                  <span class="value">{{ caseData()!.basicData.fullName }}</span>
                </div>
                <div class="info-item">
                  <span class="label">العمر</span>
                  <span class="value">{{ caseData()!.basicData.age }} سنة</span>
                </div>
                <div class="info-item">
                  <span class="label">النوع</span>
                  <span class="value">{{ getGenderLabel(caseData()!.basicData.gender) }}</span>
                </div>
                <div class="info-item">
                  <span class="label">الرقم القومي</span>
                  <span class="value">{{ caseData()!.basicData.nationalId }}</span>
                </div>
                <div class="info-item">
                  <span class="label">الموبايل</span>
                  <span class="value">{{ caseData()!.basicData.mobile }}</span>
                </div>
                <div class="info-item">
                  <span class="label">التليفون الأرضي</span>
                  <span class="value">{{ caseData()!.basicData.landline || '—' }}</span>
                </div>
                <div class="info-item">
                  <span class="label">التعليم</span>
                  <span class="value">{{ getEducationLabel(caseData()!.basicData.education) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Address -->
          <div class="section-card">
            <div class="section-header">
              <mat-icon>location_on</mat-icon>
              <h3>العنوان</h3>
            </div>
            <div class="section-body">
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">المحافظة</span>
                  <span class="value">{{ caseData()!.address.governorate }}</span>
                </div>
                <div class="info-item">
                  <span class="label">المدينة/المركز</span>
                  <span class="value">{{ caseData()!.address.cityCenter }}</span>
                </div>
                <div class="info-item">
                  <span class="label">المنطقة/القرية</span>
                  <span class="value">{{ caseData()!.address.areaVillage }}</span>
                </div>
                <div class="info-item">
                  <span class="label">الشارع</span>
                  <span class="value">{{ caseData()!.address.street }}</span>
                </div>
                <div class="info-item full-width">
                  <span class="label">العنوان التفصيلي</span>
                  <span class="value">{{ caseData()!.address.detailedAddress }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Aspect -->
          <div class="section-card">
            <div class="section-header">
              <mat-icon>family_restroom</mat-icon>
              <h3>الجانب الاجتماعي</h3>
            </div>
            <div class="section-body">
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">الحالة الاجتماعية</span>
                  <span class="value">{{ getMaritalStatusLabel(caseData()!.socialAspect.maritalStatus) }}</span>
                </div>
                <div class="info-item">
                  <span class="label">هل هو المعيل</span>
                  <span class="value">{{ caseData()!.socialAspect.isProvider ? 'نعم' : 'لا' }}</span>
                </div>
                <div class="info-item">
                  <span class="label">عدد الأفراد</span>
                  <span class="value">{{ caseData()!.socialAspect.numberOfDependents }}</span>
                </div>
                <div class="info-item">
                  <span class="label">عدد الزوجات</span>
                  <span class="value">{{ caseData()!.socialAspect.numberOfWives }}</span>
                </div>
                <div class="info-item">
                  <span class="label">عدد الأولاد</span>
                  <span class="value">{{ caseData()!.socialAspect.numberOfChildren }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Health Aspect -->
          <div class="section-card">
            <div class="section-header">
              <mat-icon>medical_services</mat-icon>
              <h3>الجانب الصحي</h3>
            </div>
            <div class="section-body">
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">لديه تأمين صحي</span>
                  <span class="value">{{ caseData()!.healthAspect.hasHealthInsurance ? 'نعم' : 'لا' }}</span>
                </div>
                <div class="info-item">
                  <span class="label">الزوجة حامل</span>
                  <span class="value">{{ caseData()!.healthAspect.isWifePregnant ? 'نعم' : 'لا' }}</span>
                </div>
                <div class="info-item">
                  <span class="label">تتردد على تنظيم الأسرة</span>
                  <span class="value">{{ caseData()!.healthAspect.visitsFamilyPlanning ? 'نعم' : 'لا' }}</span>
                </div>
                <div class="info-item">
                  <span class="label">لديه إدمان</span>
                  <span class="value">{{ caseData()!.healthAspect.hasDrugAddiction ? 'نعم' : 'لا' }}</span>
                </div>
                <div class="info-item">
                  <span class="label">يتلقى علاج الإدمان</span>
                  <span class="value">{{ caseData()!.healthAspect.receivesAddictionTreatment ? 'نعم' : 'لا' }}</span>
                </div>
                @if (caseData()!.healthAspect.addictionTreatmentPlace) {
                  <div class="info-item full-width">
                    <span class="label">مكان العلاج</span>
                    <span class="value">{{ caseData()!.healthAspect.addictionTreatmentPlace }}</span>
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Employment & Income -->
          <div class="section-card full-width">
            <div class="section-header">
              <mat-icon>work</mat-icon>
              <h3>العمل والدخل</h3>
            </div>
            <div class="section-body">
              <div class="summary-row">
                <div class="summary-item">
                  <span class="summary-label">الدخل الشهري</span>
                  <span class="summary-value income">{{ caseData()!.employmentAndIncome.monthlyIncome }} ج.م</span>
                </div>
              </div>
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">لديه عمل</span>
                  <span class="value">{{ caseData()!.employmentAndIncome.isEmployed ? 'نعم' : 'لا' }}</span>
                </div>
                <div class="info-item">
                  <span class="label">نوع العمل</span>
                  <span class="value">{{ getWorkTypeLabel(caseData()!.employmentAndIncome.workType) }}</span>
                </div>
                <div class="info-item">
                  <span class="label">المسمى الوظيفي</span>
                  <span class="value">{{ caseData()!.employmentAndIncome.jobTitle || '—' }}</span>
                </div>
                <div class="info-item">
                  <span class="label">الحرفة</span>
                  <span class="value">{{ caseData()!.employmentAndIncome.craft || '—' }}</span>
                </div>
                <div class="info-item">
                  <span class="label">المعاش</span>
                  <span class="value">{{ caseData()!.employmentAndIncome.pension }} ج.م</span>
                </div>
                <div class="info-item">
                  <span class="label">النفقة</span>
                  <span class="value">{{ caseData()!.employmentAndIncome.alimony }} ج.م</span>
                </div>
                <div class="info-item">
                  <span class="label">الصدقات</span>
                  <span class="value">{{ caseData()!.employmentAndIncome.charity }} ج.م</span>
                </div>
                <div class="info-item">
                  <span class="label">مساعدات الأقارب</span>
                  <span class="value">{{ caseData()!.employmentAndIncome.relativesHelp }} ج.م</span>
                </div>
                <div class="info-item">
                  <span class="label">دخل آخر</span>
                  <span class="value">{{ caseData()!.employmentAndIncome.otherIncome }} ج.م</span>
                </div>
                @if (caseData()!.employmentAndIncome.otherIncomeDescription) {
                  <div class="info-item full-width">
                    <span class="label">وصف الدخل الآخر</span>
                    <span class="value">{{ caseData()!.employmentAndIncome.otherIncomeDescription }}</span>
                  </div>
                }
                <div class="info-item">
                  <span class="label">لديه مشروع خاص</span>
                  <span class="value">{{ caseData()!.employmentAndIncome.hasOwnProject ? 'نعم' : 'لا' }}</span>
                </div>
                @if (caseData()!.employmentAndIncome.hasOwnProject) {
                  <div class="info-item">
                    <span class="label">نوع المشروع</span>
                    <span class="value">{{ caseData()!.employmentAndIncome.projectType }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">الجهة المانحة</span>
                    <span class="value">{{ caseData()!.employmentAndIncome.projectDonor }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">رأس المال</span>
                    <span class="value">{{ caseData()!.employmentAndIncome.projectCapital }} ج.م</span>
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Expenses -->
          <div class="section-card full-width">
            <div class="section-header">
              <mat-icon>payments</mat-icon>
              <h3>المصروفات</h3>
            </div>
            <div class="section-body">
              <div class="summary-row">
                <div class="summary-item">
                  <span class="summary-label">إجمالي المصروفات</span>
                  <span class="summary-value expenses">{{ caseData()!.expenses.monthlyExpenses }} ج.م</span>
                </div>
                <div class="summary-item">
                  <span class="summary-label">صافي الدخل</span>
                  <span class="summary-value" [class.positive]="isPositive(caseData()!.expenses.netIncome)" [class.negative]="!isPositive(caseData()!.expenses.netIncome)">
                    {{ caseData()!.expenses.netIncome }} ج.م
                  </span>
                </div>
              </div>
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">الإيجار</span>
                  <span class="value">{{ caseData()!.expenses.rent }} ج.م</span>
                </div>
                <div class="info-item">
                  <span class="label">مصروفات تعليم</span>
                  <span class="value">{{ caseData()!.expenses.educationExpenses }} ج.م</span>
                </div>
                <div class="info-item">
                  <span class="label">كهرباء</span>
                  <span class="value">{{ caseData()!.expenses.electricityBill }} ج.م</span>
                </div>
                <div class="info-item">
                  <span class="label">مياه</span>
                  <span class="value">{{ caseData()!.expenses.waterBill }} ج.م</span>
                </div>
                <div class="info-item">
                  <span class="label">غاز</span>
                  <span class="value">{{ caseData()!.expenses.gasBill }} ج.م</span>
                </div>
                <div class="info-item">
                  <span class="label">تليفون</span>
                  <span class="value">{{ caseData()!.expenses.phoneBill }} ج.م</span>
                </div>
                <div class="info-item">
                  <span class="label">دروس خصوصية</span>
                  <span class="value">{{ caseData()!.expenses.tutoring }} ج.م</span>
                </div>
                <div class="info-item">
                  <span class="label">جمعيات</span>
                  <span class="value">{{ caseData()!.expenses.associations }} ج.م</span>
                </div>
                <div class="info-item">
                  <span class="label">علاج شهري</span>
                  <span class="value">{{ caseData()!.expenses.monthlyTreatment }} ج.م</span>
                </div>
                <div class="info-item">
                  <span class="label">أقساط أجهزة</span>
                  <span class="value">{{ caseData()!.expenses.deviceInstallments }} ج.م</span>
                </div>
                <div class="info-item">
                  <span class="label">تدخين</span>
                  <span class="value">{{ caseData()!.expenses.smoking }} ج.م</span>
                </div>
                <div class="info-item">
                  <span class="label">مصروفات بيت</span>
                  <span class="value">{{ caseData()!.expenses.householdExpenses }} ج.م</span>
                </div>
                <div class="info-item highlight">
                  <span class="label">إجمالي الديون</span>
                  <span class="value amount">{{ caseData()!.expenses.totalDebt }} ج.م</span>
                </div>
                <div class="info-item">
                  <span class="label">سبب الدين</span>
                  <span class="value">{{ caseData()!.expenses.debtReason || '—' }}</span>
                </div>
                <div class="info-item">
                  <span class="label">القسط الشهري</span>
                  <span class="value">{{ caseData()!.expenses.monthlyDebtPayment }} ج.م</span>
                </div>
                <div class="info-item">
                  <span class="label">صلة الدائن</span>
                  <span class="value">{{ caseData()!.expenses.creditorRelationship || '—' }}</span>
                </div>
                @if (caseData()!.expenses.otherExpenses) {
                  <div class="info-item full-width">
                    <span class="label">مصروفات أخرى</span>
                    <span class="value">{{ caseData()!.expenses.otherExpenses }}</span>
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Housing -->
          <div class="section-card">
            <div class="section-header">
              <mat-icon>home</mat-icon>
              <h3>السكن</h3>
            </div>
            <div class="section-body">
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">نوع السكن</span>
                  <span class="value">{{ getHousingTypeLabel(caseData()!.housing.housingType) }}</span>
                </div>
                @if (caseData()!.housing.ownershipName) {
                  <div class="info-item">
                    <span class="label">اسم المالك</span>
                    <span class="value">{{ caseData()!.housing.ownershipName }}</span>
                  </div>
                }
                <div class="info-item">
                  <span class="label">نوع المنزل</span>
                  <span class="value">{{ getHouseTypeLabel(caseData()!.housing.houseType) }}</span>
                </div>
                <div class="info-item">
                  <span class="label">مساحة المنزل</span>
                  <span class="value">{{ caseData()!.housing.houseArea }} م²</span>
                </div>
                <div class="info-item">
                  <span class="label">عدد الطوابق</span>
                  <span class="value">{{ caseData()!.housing.numberOfFloors }}</span>
                </div>
                <div class="info-item">
                  <span class="label">عدد الغرف</span>
                  <span class="value">{{ caseData()!.housing.numberOfRooms }}</span>
                </div>
                <div class="info-item">
                  <span class="label">نوع السقف</span>
                  <span class="value">{{ caseData()!.housing.roofType }}</span>
                </div>
                <div class="info-item">
                  <span class="label">نوع الجدران</span>
                  <span class="value">{{ caseData()!.housing.wallsType }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Infrastructure -->
          <div class="section-card">
            <div class="section-header">
              <mat-icon>construction</mat-icon>
              <h3>المرافق</h3>
            </div>
            <div class="section-body">
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">صرف صحي</span>
                  <span class="value">{{ caseData()!.infrastructure.hasSewage ? 'نعم' : 'لا' }}</span>
                </div>
                <div class="info-item">
                  <span class="label">مياه</span>
                  <span class="value">{{ caseData()!.infrastructure.hasWater ? 'نعم' : 'لا' }}</span>
                </div>
                <div class="info-item">
                  <span class="label">كهرباء</span>
                  <span class="value">{{ caseData()!.infrastructure.hasElectricity ? 'نعم' : 'لا' }}</span>
                </div>
                <div class="info-item">
                  <span class="label">غاز</span>
                  <span class="value">{{ caseData()!.infrastructure.hasGas ? 'نعم' : 'لا' }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Properties & Skills -->
          <div class="section-card full-width">
            <div class="section-header">
              <mat-icon>emoji_objects</mat-icon>
              <h3>الممتلكات والمهارات</h3>
            </div>
            <div class="section-body">
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">لديه ممتلكات</span>
                  <span class="value">{{ caseData()!.propertiesAndSkills.hasProperty ? 'نعم' : 'لا' }}</span>
                </div>
                @if (caseData()!.propertiesAndSkills.propertyDescription) {
                  <div class="info-item">
                    <span class="label">وصف الممتلكات</span>
                    <span class="value">{{ caseData()!.propertiesAndSkills.propertyDescription }}</span>
                  </div>
                }
                @if (caseData()!.propertiesAndSkills.fatherProperty) {
                  <div class="info-item">
                    <span class="label">ممتلكات الأب</span>
                    <span class="value">{{ caseData()!.propertiesAndSkills.fatherProperty }}</span>
                  </div>
                }
                <div class="info-item">
                  <span class="label">لديه مهارات</span>
                  <span class="value">{{ caseData()!.propertiesAndSkills.hasSkills ? 'نعم' : 'لا' }}</span>
                </div>
                @if (caseData()!.propertiesAndSkills.skillsDescription) {
                  <div class="info-item full-width">
                    <span class="label">وصف المهارات</span>
                    <span class="value">{{ caseData()!.propertiesAndSkills.skillsDescription }}</span>
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Researcher Opinion -->
          <div class="section-card full-width">
            <div class="section-header">
              <mat-icon>rate_review</mat-icon>
              <h3>رأي الباحث</h3>
            </div>
            <div class="section-body">
              <p class="opinion-text">{{ caseData()!.researcherOpinion.researcherOpinion }}</p>
            </div>
          </div>

          <!-- Family Members -->
          @if (caseData()!.familyMembers.length > 0) {
            <div class="section-card full-width">
              <div class="section-header">
                <mat-icon>people</mat-icon>
                <h3>أفراد الأسرة ({{ caseData()!.familyMembers.length }})</h3>
              </div>
              <div class="section-body">
                <div class="simple-table">
                  <table>
                    <thead>
                      <tr>
                        <th>الاسم</th>
                        <th>العمر</th>
                        <th>الصلة</th>
                      </tr>
                    </thead>
                    <tbody>
                      @for (member of caseData()!.familyMembers; track member.id) {
                        <tr>
                          <td>{{ member.name }}</td>
                          <td>{{ member.age }} سنة</td>
                          <td>{{ member.relationship }}</td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          }

          <!-- Education Records -->
          @if (caseData()!.educationRecords.length > 0) {
            <div class="section-card full-width">
              <div class="section-header">
                <mat-icon>school</mat-icon>
                <h3>سجلات التعليم ({{ caseData()!.educationRecords.length }})</h3>
              </div>
              <div class="section-body">
                <div class="simple-table">
                  <table>
                    <thead>
                      <tr>
                        <th>الاسم</th>
                        <th>العمر</th>
                        <th>المرحلة</th>
                        <th>المصروفات</th>
                        <th>متسرب</th>
                        <th>سبب التسرب</th>
                      </tr>
                    </thead>
                    <tbody>
                      @for (record of caseData()!.educationRecords; track record.id) {
                        <tr>
                          <td>{{ record.name }}</td>
                          <td>{{ record.age }} سنة</td>
                          <td>{{ record.educationStage }}</td>
                          <td>{{ record.educationExpenses }} ج.م</td>
                          <td>
                            <span class="badge" [class.warning]="record.isDropout" [class.success]="!record.isDropout">
                              {{ record.isDropout ? 'نعم' : 'لا' }}
                            </span>
                          </td>
                          <td>{{ record.dropoutReason || '—' }}</td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          }

          <!-- Health Records -->
          @if (caseData()!.healthRecords.length > 0) {
            <div class="section-card full-width">
              <div class="section-header">
                <mat-icon>local_hospital</mat-icon>
                <h3>السجلات الصحية ({{ caseData()!.healthRecords.length }})</h3>
              </div>
              <div class="section-body">
                <div class="simple-table">
                  <table>
                    <thead>
                      <tr>
                        <th>الصلة</th>
                        <th>الاسم</th>
                        <th>العمر</th>
                        <th>الشكوى</th>
                        <th>تكلفة العلاج</th>
                        <th>لديه روشتة</th>
                      </tr>
                    </thead>
                    <tbody>
                      @for (record of caseData()!.healthRecords; track record.id) {
                        <tr>
                          <td>{{ record.relationship }}</td>
                          <td>{{ record.name }}</td>
                          <td>{{ record.age }} سنة</td>
                          <td>{{ record.complaint }}</td>
                          <td>{{ record.monthlyTreatmentCost }} ج.م</td>
                          <td>{{ record.hasPrescription ? 'نعم' : 'لا' }}</td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          }

          <!-- Family Needs -->
          @if (caseData()!.familyNeeds.length > 0) {
            <div class="section-card full-width">
              <div class="section-header">
                <mat-icon>inventory</mat-icon>
                <h3>احتياجات الأسرة ({{ caseData()!.familyNeeds.length }})</h3>
              </div>
              <div class="section-body">
                <div class="simple-table">
                  <table>
                    <thead>
                      <tr>
                        <th>نوع الاحتياج</th>
                        <th>الوصف</th>
                        <th>الأولوية</th>
                        <th>تم الوفاء</th>
                        <th>تاريخ الوفاء</th>
                      </tr>
                    </thead>
                    <tbody>
                      @for (need of caseData()!.familyNeeds; track need.id) {
                        <tr>
                          <td>{{ getNeedTypeLabel(need.needType) }}</td>
                          <td>{{ need.description }}</td>
                          <td><span class="priority-badge">{{ need.priority }}</span></td>
                          <td>
                            <span class="badge" [class.success]="need.isFulfilled" [class.warning]="!need.isFulfilled">
                              {{ need.isFulfilled ? 'نعم' : 'لا' }}
                            </span>
                          </td>
                          <td>{{ need.fulfilledDate || '—' }}</td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `
})
export class CaseDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly caseService = inject(CaseService);

  readonly caseId = signal<string>('');
  readonly caseData = signal<CaseDetail | null>(null);
  readonly loading = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.caseId.set(id);
      this.loadCase(id);
    }
  }

  loadCase(id: string): void {
    this.loading.set(true);
    this.caseService.getCase(id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (data) => this.caseData.set(data),
        error: (error) => console.error('Error loading case:', error)
      });
  }

  getStatusClass(status: string): string { return status; }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'draft': 'مسودة', 'submitted': 'مقدم', 'under_review': 'قيد المراجعة',
      'approved': 'مقبول', 'rejected': 'مرفوض'
    };
    return labels[status] || status;
  }

  getGenderLabel(gender: string): string {
    return gender === 'male' ? 'ذكر' : 'أنثى';
  }

  getEducationLabel(education: string): string {
    const labels: { [key: string]: string } = {
      'illiterate': 'أمي', 'primary': 'ابتدائي', 'middle': 'إعدادي',
      'high': 'ثانوي', 'university': 'جامعي'
    };
    return labels[education] || education;
  }

  getMaritalStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'single': 'أعزب', 'married': 'متزوج', 'divorced': 'مطلق', 'widowed': 'أرمل'
    };
    return labels[status] || status;
  }

  getWorkTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'government': 'حكومي', 'private': 'خاص', 'freelance': 'حر', 'unemployed': 'عاطل'
    };
    return labels[type] || type;
  }

  getHousingTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'rent': 'إيجار', 'owned': 'ملك', 'family': 'عائلي'
    };
    return labels[type] || type;
  }

  getHouseTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'apartment': 'شقة', 'house': 'منزل', 'private': 'خاص', 'villa': 'فيلا'
    };
    return labels[type] || type;
  }

  getNeedTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'monthly_sponsorship': 'كفالة شهرية', 'health_treatment': 'علاج صحي',
      'education': 'تعليم', 'housing': 'سكن', 'other': 'أخرى'
    };
    return labels[type] || type;
  }

  isPositive(value: string): boolean {
    return parseFloat(value) >= 0;
  }
}

export { CaseDetailComponent as CaseDetail };
