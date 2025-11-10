import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface CaseItem {
  id: number;
  caseCode: string;
  fullName: string;
  status: string;
  researcher: string;
  assignedTo: string | null;
  governorate: string;
  cityCenter: string;
  monthlyIncome: string;
  monthlyExpenses: string;
  netIncome: string;
  createdAt: string;
  updatedAt: string;
}

export interface CaseDetail {
  researcherInformation: {
    caseCode: string;
    researcherName: string;
    guideName: string;
    guideMobile: string;
  };
  basicData: {
    fullName: string;
    age: number;
    gender: string;
    nationalId: string;
    mobile: string;
    landline: string;
    education: string;
  };
  address: {
    governorate: string;
    cityCenter: string;
    areaVillage: string;
    street: string;
    detailedAddress: string;
  };
  socialAspect: {
    maritalStatus: string;
    isProvider: boolean;
    numberOfDependents: number;
    numberOfWives: number;
    numberOfChildren: number;
  };
  healthAspect: {
    hasHealthInsurance: boolean;
    isWifePregnant: boolean;
    visitsFamilyPlanning: boolean;
    hasDrugAddiction: boolean;
    receivesAddictionTreatment: boolean;
    addictionTreatmentPlace: string;
  };
  employmentAndIncome: {
    isEmployed: boolean;
    workType: string;
    jobTitle: string;
    craft: string;
    monthlyIncome: string;
    pension: string;
    alimony: string;
    charity: string;
    relativesHelp: string;
    otherIncome: string;
    otherIncomeDescription: string;
    hasOwnProject: boolean;
    projectType: string;
    projectDonor: string;
    projectCapital: string;
  };
  expenses: {
    monthlyExpenses: string;
    netIncome: string;
    rent: string;
    educationExpenses: string;
    electricityBill: string;
    waterBill: string;
    gasBill: string;
    phoneBill: string;
    tutoring: string;
    associations: string;
    monthlyTreatment: string;
    deviceInstallments: string;
    smoking: string;
    householdExpenses: string;
    totalDebt: string;
    debtReason: string;
    monthlyDebtPayment: string;
    creditorRelationship: string;
    otherExpenses: string;
  };
  housing: {
    housingType: string;
    ownershipName: string;
    houseType: string;
    houseArea: string;
    numberOfFloors: number;
    numberOfRooms: number;
    roofType: string;
    wallsType: string;
  };
  infrastructure: {
    hasSewage: boolean;
    hasWater: boolean;
    hasElectricity: boolean;
    hasGas: boolean;
  };
  propertiesAndSkills: {
    hasProperty: boolean;
    propertyDescription: string;
    fatherProperty: string;
    hasSkills: boolean;
    skillsDescription: string;
  };
  researcherOpinion: {
    researcherOpinion: string;
  };
  caseManagement: {
    status: string;
    assignedToName: string | null;
    createdAt: string;
    updatedAt: string;
  };
  familyMembers: Array<{
    id: number;
    name: string;
    age: number;
    relationship: string;
  }>;
  educationRecords: Array<{
    id: number;
    name: string;
    age: number;
    educationStage: string;
    educationExpenses: string;
    isDropout: boolean;
    dropoutReason: string;
  }>;
  healthRecords: Array<{
    id: number;
    relationship: string;
    name: string;
    age: number;
    complaint: string;
    monthlyTreatmentCost: string;
    hasPrescription: boolean;
  }>;
  familyNeeds: Array<{
    id: number;
    needType: string;
    description: string;
    healthNeedType: string | null;
    priority: number;
    isFulfilled: boolean;
    fulfilledDate: string | null;
  }>;
  attachments: Array<{
    id: number;
    fileUrl: string;
    attachmentType: string;
    description: string;
    uploadedBy: string;
    uploadedAt: string;
  }>;
  notes: Array<{
    id: number;
    note: string;
    createdBy: string;
    createdAt: string;
  }>;
  statusHistory: Array<{
    id: number;
    fromStatus: string;
    toStatus: string;
    changedBy: string;
    changedAt: string;
    note: string;
  }>;
}

export interface Paginated<T> {
  data: T[];
  meta: {
    count: number;
    page: number;
    page_size: number;
    num_pages: number;
  };
}

export interface CaseFilters {
  code?: string;
  name?: string;
  researcher?: number;
}

export interface CreateCasePayload {
  fullName: string;
  age: number;
  gender: string;
  nationalId: string;
  mobile: string;
  landline?: string;
  governorate: string;
  cityCenter: string;
  areaVillage: string;
  street: string;
  detailedAddress: string;
  education: string;
  maritalStatus: string;
  isProvider: boolean;
  numberOfDependents: number;
  numberOfWives: number;
  numberOfChildren: number;
  hasHealthInsurance: boolean;
  isWifePregnant: boolean;
  visitsFamilyPlanning: boolean;
  hasDrugAddiction: boolean;
  receivesAddictionTreatment: boolean;
  addictionTreatmentPlace?: string;
  isEmployed: boolean;
  workType: string;
  jobTitle?: string;
  craft?: string;
  monthlyIncome: string;
  pension: string;
  alimony: string;
  charity: string;
  relativesHelp: string;
  otherIncome: string;
  otherIncomeDescription?: string;
  hasOwnProject: boolean;
  projectType?: string;
  projectDonor?: string;
  projectCapital?: string;
  rent: string;
  educationExpenses: string;
  electricityBill: string;
  waterBill: string;
  gasBill: string;
  phoneBill: string;
  tutoring: string;
  associations: string;
  monthlyTreatment: string;
  deviceInstallments: string;
  smoking: string;
  householdExpenses: string;
  totalDebt: string;
  debtReason?: string;
  monthlyDebtPayment: string;
  creditorRelationship?: string;
  otherExpenses?: string;
  housingType: string;
  ownershipName?: string;
  houseType: string;
  houseArea: string;
  numberOfFloors: number;
  numberOfRooms: number;
  roofType: string;
  wallsType: string;
  hasSewage: boolean;
  hasWater: boolean;
  hasElectricity: boolean;
  hasGas: boolean;
  hasProperty: boolean;
  propertyDescription?: string;
  fatherProperty?: string;
  hasSkills: boolean;
  skillsDescription?: string;
  status: string;
  researcher?: number;
  guideName: string;
  guideMobile: string;
  researcherOpinion: string;
  familyMembers: Array<{
    name: string;
    age: number;
    relationship: string;
  }>;
  educationRecords: Array<{
    name: string;
    age: number;
    educationStage: string;
    educationExpenses: string;
    isDropout: boolean;
    dropoutReason?: string;
  }>;
  healthRecords: Array<{
    relationship: string;
    name: string;
    age: number;
    complaint: string;
    monthlyTreatmentCost: string;
    hasPrescription: boolean;
  }>;
  familyNeeds: Array<{
    needType: string;
    description: string;
    healthNeedType?: string | null;
    priority: number;
    isFulfilled: boolean;
  }>;
}

export interface CreateCaseResponse {
  success: boolean;
  message: string;
  data: {
    caseCode: string;
  };
  errors: any;
  meta: any;
}

@Injectable({ providedIn: 'root' })
export class CaseService {
  private readonly http = inject(HttpClient);

  getCases(page = 1, pageSize = 10, filters?: CaseFilters): Observable<Paginated<CaseItem>> {
    let params = new HttpParams()
      .set('page', page)
      .set('page_size', pageSize);

    if (filters?.code) {
      params = params.set('code', filters.code);
    }
    if (filters?.name) {
      params = params.set('name', filters.name);
    }
    if (filters?.researcher) {
      params = params.set('researcher', filters.researcher);
    }

    return this.http.get<any>('cases/', { params }).pipe(
      map(res => ({ data: res?.data ?? [], meta: res?.meta ?? { count: 0, page, page_size: pageSize, num_pages: 0 } }))
    );
  }

  getCase(id: string | number): Observable<CaseDetail> {
    return this.http.get<any>(`cases/${id}/`).pipe(map(res => res?.data ?? res));
  }

  createCase(payload: CreateCasePayload): Observable<CreateCaseResponse> {
    return this.http.post<CreateCaseResponse>('cases/create/', payload);
  }

  updateCase(id: string | number, payload: CreateCasePayload): Observable<CreateCaseResponse> {
    return this.http.put<CreateCaseResponse>(`cases/${id}/`, payload);
  }

  printCase(id: string | number): Observable<Blob> {
    return this.http.get(`cases/${id}/print/`, {
      responseType: 'blob'
    });
  }
}

export type { CaseItem as ICaseItem };
