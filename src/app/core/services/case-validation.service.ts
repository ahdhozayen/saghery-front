import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

// Valid choice values for each field
const VALID_EDUCATION_CHOICES = ['illiterate', 'literacy_certificate', 'preparatory', 'medium', 'high'] as const;
const VALID_WORK_TYPE_CHOICES = ['government', 'private', 'stable', 'craftsman', 'seasonal', 'daily', ''] as const;
const VALID_HOUSING_TYPE_CHOICES = ['rent', 'owned'] as const;
const VALID_HOUSE_TYPE_CHOICES = ['family', 'private'] as const;

type EducationChoice = typeof VALID_EDUCATION_CHOICES[number];
type WorkTypeChoice = typeof VALID_WORK_TYPE_CHOICES[number];
type HousingTypeChoice = typeof VALID_HOUSING_TYPE_CHOICES[number];
type HouseTypeChoice = typeof VALID_HOUSE_TYPE_CHOICES[number];

interface ChoiceFieldConfig<T extends string> {
  fieldName: string;
  validChoices: readonly T[];
  defaultValue: T;
}

@Injectable({ providedIn: 'root' })
export class CaseValidationService {
  private readonly choiceFields: readonly ChoiceFieldConfig<any>[] = [
    {
      fieldName: 'education',
      validChoices: VALID_EDUCATION_CHOICES,
      defaultValue: 'high'
    },
    {
      fieldName: 'workType',
      validChoices: VALID_WORK_TYPE_CHOICES,
      defaultValue: ''
    },
    {
      fieldName: 'housingType',
      validChoices: VALID_HOUSING_TYPE_CHOICES,
      defaultValue: 'rent'
    },
    {
      fieldName: 'houseType',
      validChoices: VALID_HOUSE_TYPE_CHOICES,
      defaultValue: 'private'
    }
  ];

  /**
   * Validates and resets invalid choice field values to their defaults
   * @param form - The FormGroup containing choice fields
   */
  validateAndResetChoiceFields(form: FormGroup): void {
    this.choiceFields.forEach(config => {
      const control = form.get(config.fieldName);
      if (!control) return;

      const value = control.value;
      const isValid = this.isValidChoice(value, config.validChoices);

      if (!isValid) {
        control.setValue(config.defaultValue);
      }
    });
  }

  /**
   * Sanitizes choice field values in a payload object
   * @param payload - The payload object to sanitize
   * @returns The sanitized payload
   */
  sanitizeChoiceFields<T extends Record<string, any>>(payload: T): T {
    const sanitized: Record<string, any> = { ...payload };

    this.choiceFields.forEach(config => {
      const value = sanitized[config.fieldName];
      if (value !== undefined && !this.isValidChoice(value, config.validChoices)) {
        sanitized[config.fieldName] = config.defaultValue;
      }
    });

    return sanitized as T;
  }

  /**
   * Checks if a value is within the valid choices
   */
  private isValidChoice<T extends string>(value: any, validChoices: readonly T[]): boolean {
    return validChoices.includes(value as T);
  }

  /**
   * Gets valid choices for a specific field
   */
  getValidChoices(fieldName: string): readonly string[] | undefined {
    return this.choiceFields.find(config => config.fieldName === fieldName)?.validChoices;
  }

  /**
   * Gets the default value for a specific field
   */
  getDefaultValue(fieldName: string): string | undefined {
    return this.choiceFields.find(config => config.fieldName === fieldName)?.defaultValue;
  }
}
