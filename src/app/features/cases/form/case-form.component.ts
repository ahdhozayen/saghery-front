import { ChangeDetectionStrategy, Component, inject, signal, OnInit, viewChild, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CaseService, CreateCasePayload } from '../../../core/services/case.service';
import { CaseValidationService } from '../../../core/services/case-validation.service';
import { ComponentWithUnsavedChanges } from '../../../core/guards/unsaved-changes.guard';
import { finalize } from 'rxjs';

// TypeScript interfaces for FormArray types
interface FamilyMemberForm {
  name: FormControl<string>;
  age: FormControl<number>;
  relationship: FormControl<string>;
}

interface EducationRecordForm {
  name: FormControl<string>;
  age: FormControl<number>;
  educationStage: FormControl<string>;
  educationExpenses: FormControl<string>;
  isDropout: FormControl<boolean>;
  dropoutReason: FormControl<string>;
}

interface HealthRecordForm {
  relationship: FormControl<string>;
  name: FormControl<string>;
  age: FormControl<number>;
  complaint: FormControl<string>;
  monthlyTreatmentCost: FormControl<string>;
  hasPrescription: FormControl<boolean>;
}

interface FamilyNeedForm {
  needType: FormControl<string>;
  description: FormControl<string>;
  healthNeedType: FormControl<string | null>;
  priority: FormControl<number>;
  isFulfilled: FormControl<boolean>;
}

// Tab Components
import { BasicInfoTabComponent } from './tabs/basic-info-tab.component';
import { AddressTabComponent } from './tabs/address-tab.component';
import { ResearcherInfoTabComponent } from './tabs/researcher-info-tab.component';
import { SocialAspectTabComponent } from './tabs/social-aspect-tab.component';
import { HealthAspectTabComponent } from './tabs/health-aspect-tab.component';
import { EmploymentIncomeTabComponent } from './tabs/employment-income-tab.component';
import { ExpensesTabComponent } from './tabs/expenses-tab.component';
import { HousingTabComponent } from './tabs/housing-tab.component';
import { InfrastructureTabComponent } from './tabs/infrastructure-tab.component';
import { PropertiesSkillsTabComponent } from './tabs/properties-skills-tab.component';
import { ResearcherOpinionTabComponent } from './tabs/researcher-opinion-tab.component';
import { FamilyMembersTabComponent } from './tabs/family-members-tab.component';
import { EducationRecordsTabComponent } from './tabs/education-records-tab.component';
import { HealthRecordsTabComponent } from './tabs/health-records-tab.component';
import { FamilyNeedsTabComponent } from './tabs/family-needs-tab.component';

@Component({
  selector: 'app-case-form',
  templateUrl: './case-form.component.html',
  styleUrls: ['./case-form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    // Tab Components
    BasicInfoTabComponent,
    AddressTabComponent,
    ResearcherInfoTabComponent,
    SocialAspectTabComponent,
    HealthAspectTabComponent,
    EmploymentIncomeTabComponent,
    ExpensesTabComponent,
    HousingTabComponent,
    InfrastructureTabComponent,
    PropertiesSkillsTabComponent,
    ResearcherOpinionTabComponent,
    FamilyMembersTabComponent,
    EducationRecordsTabComponent,
    HealthRecordsTabComponent,
    FamilyNeedsTabComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:beforeunload)': 'onBeforeUnload($event)',
    '(document:keydown.control.s)': 'onSaveShortcut($event)',
    '(document:keydown.meta.s)': 'onSaveShortcut($event)',
    '(document:keydown.escape)': 'onCancelShortcut($event)',
    '(document:keydown.control.ArrowLeft)': 'onPreviousTab($event)',
    '(document:keydown.control.ArrowRight)': 'onNextTab($event)',
    '(document:keydown.meta.ArrowLeft)': 'onPreviousTab($event)',
    '(document:keydown.meta.ArrowRight)': 'onNextTab($event)'
  }
})
export class CaseFormComponent implements OnInit, ComponentWithUnsavedChanges {
  private readonly caseService = inject(CaseService);
  private readonly caseValidationService = inject(CaseValidationService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly snackBar = inject(MatSnackBar);

  readonly loading = signal(false);
  readonly isEditMode = signal(false);
  readonly tabGroup = viewChild<MatTabGroup>('tabGroup');

  // Tab validation status computed signals
  readonly basicInfoTabValid = computed(() => {
    const controls = ['fullName', 'age', 'gender', 'nationalId', 'mobile'];
    return controls.every(field => this.form.get(field)?.valid);
  });

  readonly addressTabValid = computed(() => {
    const controls = ['governorate', 'cityCenter', 'areaVillage', 'street', 'detailedAddress'];
    return controls.every(field => this.form.get(field)?.valid);
  });

  readonly researcherInfoTabValid = computed(() => {
    const controls = ['guideMobile'];
    return controls.every(field => {
      const control = this.form.get(field);
      return !control?.value || control?.valid;
    });
  });

  readonly form = new FormGroup({
    // Basic Data - Required
    fullName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    age: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    gender: new FormControl('male', { nonNullable: true, validators: [Validators.required] }),
    nationalId: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^\d{14}$/)] }),
    mobile: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)] }),
    landline: new FormControl('', { nonNullable: true }),
    education: new FormControl('high', { nonNullable: true }),

    // Address - Required
    governorate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    cityCenter: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    areaVillage: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    street: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    detailedAddress: new FormControl('', { nonNullable: true, validators: [Validators.required] }),

    // Researcher Info - Optional
    researcher: new FormControl<number | null>(null, { nonNullable: false }),
    guideName: new FormControl('', { nonNullable: true }),
    guideMobile: new FormControl('', { nonNullable: true, validators: [Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)] }),

    // Social Aspect - Optional
    maritalStatus: new FormControl('married', { nonNullable: true }),
    isProvider: new FormControl(true, { nonNullable: true }),
    numberOfDependents: new FormControl(0, { nonNullable: true }),
    numberOfWives: new FormControl(0, { nonNullable: true }),
    numberOfChildren: new FormControl(0, { nonNullable: true }),

    // Health Aspect - Optional
    hasHealthInsurance: new FormControl(false, { nonNullable: true }),
    isWifePregnant: new FormControl(false, { nonNullable: true }),
    visitsFamilyPlanning: new FormControl(false, { nonNullable: true }),
    hasDrugAddiction: new FormControl(false, { nonNullable: true }),
    receivesAddictionTreatment: new FormControl(false, { nonNullable: true }),
    addictionTreatmentPlace: new FormControl('', { nonNullable: true }),

    // Employment & Income - Optional
    isEmployed: new FormControl(true, { nonNullable: true }),
    workType: new FormControl('', { nonNullable: true }),
    jobTitle: new FormControl('', { nonNullable: true }),
    craft: new FormControl('', { nonNullable: true }),
    monthlyIncome: new FormControl('0', { nonNullable: true }),
    pension: new FormControl('0', { nonNullable: true }),
    alimony: new FormControl('0', { nonNullable: true }),
    charity: new FormControl('0', { nonNullable: true }),
    relativesHelp: new FormControl('0', { nonNullable: true }),
    otherIncome: new FormControl('0', { nonNullable: true }),
    otherIncomeDescription: new FormControl('', { nonNullable: true }),
    hasOwnProject: new FormControl(false, { nonNullable: true }),
    projectType: new FormControl('', { nonNullable: true }),
    projectDonor: new FormControl('', { nonNullable: true }),
    projectCapital: new FormControl('0', { nonNullable: true }),

    // Expenses - Optional
    rent: new FormControl('0', { nonNullable: true }),
    educationExpenses: new FormControl('0', { nonNullable: true }),
    electricityBill: new FormControl('0', { nonNullable: true }),
    waterBill: new FormControl('0', { nonNullable: true }),
    gasBill: new FormControl('0', { nonNullable: true }),
    phoneBill: new FormControl('0', { nonNullable: true }),
    tutoring: new FormControl('0', { nonNullable: true }),
    associations: new FormControl('0', { nonNullable: true }),
    monthlyTreatment: new FormControl('0', { nonNullable: true }),
    deviceInstallments: new FormControl('0', { nonNullable: true }),
    smoking: new FormControl('0', { nonNullable: true }),
    householdExpenses: new FormControl('0', { nonNullable: true }),
    totalDebt: new FormControl('0', { nonNullable: true }),
    debtReason: new FormControl('', { nonNullable: true }),
    monthlyDebtPayment: new FormControl('0', { nonNullable: true }),
    creditorRelationship: new FormControl('', { nonNullable: true }),
    otherExpenses: new FormControl('', { nonNullable: true }),

    // Housing - Optional
    housingType: new FormControl('rent', { nonNullable: true }),
    ownershipName: new FormControl('', { nonNullable: true }),
    houseType: new FormControl('private', { nonNullable: true }),
    houseArea: new FormControl('0', { nonNullable: true }),
    numberOfFloors: new FormControl(1, { nonNullable: true }),
    numberOfRooms: new FormControl(1, { nonNullable: true }),
    roofType: new FormControl('', { nonNullable: true }),
    wallsType: new FormControl('', { nonNullable: true }),

    // Infrastructure - Optional
    hasSewage: new FormControl(true, { nonNullable: true }),
    hasWater: new FormControl(true, { nonNullable: true }),
    hasElectricity: new FormControl(true, { nonNullable: true }),
    hasGas: new FormControl(true, { nonNullable: true }),

    // Properties & Skills - Optional
    hasProperty: new FormControl(false, { nonNullable: true }),
    propertyDescription: new FormControl('', { nonNullable: true }),
    fatherProperty: new FormControl('', { nonNullable: true }),
    hasSkills: new FormControl(false, { nonNullable: true }),
    skillsDescription: new FormControl('', { nonNullable: true }),

    // Status & Opinion - Optional
    status: new FormControl('draft', { nonNullable: true }),
    researcherOpinion: new FormControl('', { nonNullable: true }),

    // Arrays - Optional
    familyMembers: new FormArray<FormGroup<FamilyMemberForm>>([]),
    educationRecords: new FormArray<FormGroup<EducationRecordForm>>([]),
    healthRecords: new FormArray<FormGroup<HealthRecordForm>>([]),
    familyNeeds: new FormArray<FormGroup<FamilyNeedForm>>([])
  });

  get familyMembers() {
    return this.form.get('familyMembers') as FormArray<FormGroup<FamilyMemberForm>>;
  }

  get educationRecords() {
    return this.form.get('educationRecords') as FormArray<FormGroup<EducationRecordForm>>;
  }

  get healthRecords() {
    return this.form.get('healthRecords') as FormArray<FormGroup<HealthRecordForm>>;
  }

  get familyNeeds() {
    return this.form.get('familyNeeds') as FormArray<FormGroup<FamilyNeedForm>>;
  }

  hasUnsavedChanges(): boolean {
    return this.form.dirty && !this.loading();
  }

  onBeforeUnload(event: BeforeUnloadEvent): void {
    if (this.hasUnsavedChanges()) {
      event.preventDefault();
      event.returnValue = true;
    }
  }

  onSaveShortcut(event: KeyboardEvent): void {
    event.preventDefault();
    if (!this.loading() && this.isBasicInfoValid()) {
      this.onSubmit();
    }
  }

  onCancelShortcut(event: KeyboardEvent): void {
    event.preventDefault();
    this.router.navigate(['/cases']);
  }

  onPreviousTab(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    const tabGroupInstance = this.tabGroup();
    if (tabGroupInstance && tabGroupInstance.selectedIndex !== null) {
      const currentIndex = tabGroupInstance.selectedIndex;
      if (currentIndex > 0) {
        tabGroupInstance.selectedIndex = currentIndex - 1;
      }
    }
  }

  onNextTab(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    const tabGroupInstance = this.tabGroup();
    if (tabGroupInstance && tabGroupInstance.selectedIndex !== null) {
      const currentIndex = tabGroupInstance.selectedIndex;
      const totalTabs = 15; // Total number of tabs
      if (currentIndex < totalTabs - 1) {
        tabGroupInstance.selectedIndex = currentIndex + 1;
      }
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      // TODO: Load case data for editing
    }

    // Validate and reset invalid choice values to prevent submission errors
    this.caseValidationService.validateAndResetChoiceFields(this.form);
  }

  isBasicInfoValid(): boolean {
    const basicFields = ['fullName', 'age', 'gender', 'nationalId', 'mobile'];
    const addressFields = ['governorate', 'cityCenter', 'areaVillage', 'street', 'detailedAddress'];
    
    const allRequiredFields = [...basicFields, ...addressFields];
    
    return allRequiredFields.every(field => {
      const control = this.form.get(field);
      return control && control.valid;
    });
  }

  addFamilyMember(): void {
    this.familyMembers.push(new FormGroup<FamilyMemberForm>({
      name: new FormControl('', { nonNullable: true }),
      age: new FormControl(0, { nonNullable: true }),
      relationship: new FormControl('', { nonNullable: true })
    }));
  }

  removeFamilyMember(index: number): void {
    this.familyMembers.removeAt(index);
  }

  addEducationRecord(): void {
    this.educationRecords.push(new FormGroup<EducationRecordForm>({
      name: new FormControl('', { nonNullable: true }),
      age: new FormControl(0, { nonNullable: true }),
      educationStage: new FormControl('', { nonNullable: true }),
      educationExpenses: new FormControl('0', { nonNullable: true }),
      isDropout: new FormControl(false, { nonNullable: true }),
      dropoutReason: new FormControl('', { nonNullable: true })
    }));
  }

  removeEducationRecord(index: number): void {
    this.educationRecords.removeAt(index);
  }

  addHealthRecord(): void {
    this.healthRecords.push(new FormGroup<HealthRecordForm>({
      relationship: new FormControl('', { nonNullable: true }),
      name: new FormControl('', { nonNullable: true }),
      age: new FormControl(0, { nonNullable: true }),
      complaint: new FormControl('', { nonNullable: true }),
      monthlyTreatmentCost: new FormControl('0', { nonNullable: true }),
      hasPrescription: new FormControl(false, { nonNullable: true })
    }));
  }

  removeHealthRecord(index: number): void {
    this.healthRecords.removeAt(index);
  }

  addFamilyNeed(): void {
    this.familyNeeds.push(new FormGroup<FamilyNeedForm>({
      needType: new FormControl('monthly_sponsorship', { nonNullable: true }),
      description: new FormControl('', { nonNullable: true }),
      healthNeedType: new FormControl<string | null>(null),
      priority: new FormControl(1, { nonNullable: true }),
      isFulfilled: new FormControl(false, { nonNullable: true })
    }));
  }

  removeFamilyNeed(index: number): void {
    this.familyNeeds.removeAt(index);
  }

  onSubmit(): void {
    // Only validate basic info and address fields
    if (!this.isBasicInfoValid()) {
      this.form.markAllAsTouched();
      this.snackBar.open('يرجى ملء البيانات الأساسية والعنوان', 'إغلاق', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.loading.set(true);
    let payload = this.form.getRawValue() as CreateCasePayload;

    // Sanitize choice fields to match backend model
    payload = this.caseValidationService.sanitizeChoiceFields(payload);

    // Ensure status is set to draft
    payload.status = 'draft';

    this.caseService.createCase(payload)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          if (response.success) {
            // Mark form as pristine to prevent unsaved changes warning
            this.form.markAsPristine();
            this.snackBar.open(`تم حفظ الحالة كمسودة بنجاح - رقم الحالة: ${response.data.caseCode}`, 'إغلاق', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['success-snackbar']
            });
            this.router.navigate(['/cases']);
          } else {
            this.snackBar.open(response.message || 'حدث خطأ أثناء حفظ الحالة', 'إغلاق', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['error-snackbar']
            });
          }
        },
        error: (error) => {
          const message = error?.error?.message || 'حدث خطأ أثناء حفظ الحالة';
          this.snackBar.open(message, 'إغلاق', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        }
      });
  }
}

export { CaseFormComponent as CaseForm };
