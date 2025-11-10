import { Injectable, inject, computed } from '@angular/core';
import { LanguageService, Language } from './language.service';

export interface Translations {
  // Navigation
  cases: string;
  newCase: string;
  users: string;
  
  // User menu
  profile: string;
  changePassword: string;
  logout: string;
  
  // Footer
  footerText: string;
  copyright: string;
  
  // Common
  edit: string;
  delete: string;
  save: string;
  cancel: string;
  search: string;
  filter: string;
  print: string;
  view: string;
  add: string;
  back: string;
  
  // Status
  active: string;
  inactive: string;
  draft: string;
  submitted: string;
  approved: string;
  rejected: string;
  
  // Actions
  create: string;
  update: string;
  submit: string;
  
  // Dashboard
  dashboardTitle: string;
  dashboardSubtitle: string;
  totalCases: string;
  underReview: string;
  totalNeeds: string;
  ofTotal: string;
  unfulfilled: string;
  familyNeedsDistribution: string;
  caseStatusDistribution: string;
  mostRequestedNeeds: string;
  needType: string;
  totalRequests: string;
  fulfilled: string;
  pending: string;
  geographicDistribution: string;
  financialStatistics: string;
  avgMonthlyIncome: string;
  avgExpenses: string;
  avgNetIncome: string;
  totalDebt: string;
  egp: string;
  noNeedsRegistered: string;
  noData: string;
}

const translations: Record<Language, Translations> = {
  ar: {
    cases: 'الحالات',
    newCase: 'حالة جديدة',
    users: 'المستخدمين',
    profile: 'الملف الشخصي',
    changePassword: 'تغيير كلمة المرور',
    logout: 'تسجيل الخروج',
    footerText: 'نظام إدارة الحالات - صغيري',
    copyright: '© 2025 جميع الحقوق محفوظة',
    edit: 'تعديل',
    delete: 'حذف',
    save: 'حفظ',
    cancel: 'إلغاء',
    search: 'بحث',
    filter: 'تصفية',
    print: 'طباعة',
    view: 'عرض',
    add: 'إضافة',
    back: 'رجوع',
    active: 'نشط',
    inactive: 'غير نشط',
    draft: 'مسودة',
    submitted: 'مقدم',
    approved: 'موافق عليه',
    rejected: 'مرفوض',
    create: 'إنشاء',
    update: 'تحديث',
    submit: 'إرسال',
    dashboardTitle: 'لوحة التحكم',
    dashboardSubtitle: 'نظرة شاملة على أداء النظام والبيانات الإحصائية',
    totalCases: 'إجمالي الحالات',
    underReview: 'قيد المراجعة',
    totalNeeds: 'إجمالي الاحتياجات',
    ofTotal: 'من الإجمالي',
    unfulfilled: 'غير منفذة',
    familyNeedsDistribution: 'توزيع احتياجات الأسر',
    caseStatusDistribution: 'توزيع الحالات حسب الحالة',
    mostRequestedNeeds: 'أكثر الاحتياجات طلباً',
    needType: 'نوع الاحتياج',
    totalRequests: 'إجمالي الطلبات',
    fulfilled: 'منفذة',
    pending: 'قيد التنفيذ',
    geographicDistribution: 'التوزيع الجغرافي',
    financialStatistics: 'الإحصائيات المالية',
    avgMonthlyIncome: 'متوسط الدخل الشهري',
    avgExpenses: 'متوسط المصروفات',
    avgNetIncome: 'متوسط صافي الدخل',
    totalDebt: 'إجمالي الديون',
    egp: 'جنيه',
    noNeedsRegistered: 'لا توجد احتياجات مسجلة',
    noData: 'لا توجد بيانات'
  },
  en: {
    cases: 'Cases',
    newCase: 'New Case',
    users: 'Users',
    profile: 'Profile',
    changePassword: 'Change Password',
    logout: 'Logout',
    footerText: 'Case Management System - Saghery',
    copyright: '© 2025 All Rights Reserved',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    search: 'Search',
    filter: 'Filter',
    print: 'Print',
    view: 'View',
    add: 'Add',
    back: 'Back',
    active: 'Active',
    inactive: 'Inactive',
    draft: 'Draft',
    submitted: 'Submitted',
    approved: 'Approved',
    rejected: 'Rejected',
    create: 'Create',
    update: 'Update',
    submit: 'Submit',
    dashboardTitle: 'Dashboard',
    dashboardSubtitle: 'A comprehensive overview of system performance and statistical data',
    totalCases: 'Total Cases',
    underReview: 'Under Review',
    totalNeeds: 'Total Needs',
    ofTotal: 'of Total',
    unfulfilled: 'Unfulfilled',
    familyNeedsDistribution: 'Family Needs Distribution',
    caseStatusDistribution: 'Case Status Distribution',
    mostRequestedNeeds: 'Most Requested Needs',
    needType: 'Need Type',
    totalRequests: 'Total Requests',
    fulfilled: 'Fulfilled',
    pending: 'Pending',
    geographicDistribution: 'Geographic Distribution',
    financialStatistics: 'Financial Statistics',
    avgMonthlyIncome: 'Average Monthly Income',
    avgExpenses: 'Average Expenses',
    avgNetIncome: 'Average Net Income',
    totalDebt: 'Total Debt',
    egp: 'EGP',
    noNeedsRegistered: 'No needs registered',
    noData: 'No data'
  }
};

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly languageService = inject(LanguageService);
  
  readonly t = computed(() => translations[this.languageService.currentLanguage()]);
  
  translate(key: keyof Translations): string {
    return this.t()[key];
  }
}

