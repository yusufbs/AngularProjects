import { AbstractControl } from '@angular/forms';

export interface UiSelectOption<T = any> {
  label: string;
  value: T;
  disabled?: boolean;
  group?: string;
  icon?: string;
}

export interface UiRadioOption<T = any> {
  label: string;
  value: T;
  description?: string;
  disabled?: boolean;
  icon?: string;
}

export interface UiCheckboxOption<T = any> {
  label: string;
  value: T;
  description?: string;
  disabled?: boolean;
}

export type DynamicFieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'checkbox-group'
  | 'radio'
  | 'switch'
  | 'date'
  | 'file';

export interface DynamicFormFieldValidators {
  required?: boolean;
  email?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string | RegExp;
}

export interface DynamicFormFieldDependsOn {
  field: string;
  value: any;
  operator?: 'equals' | 'notEquals' | 'includes';
}

export interface DynamicFormField {
  name: string;
  type: DynamicFieldType;
  label: string;
  placeholder?: string;
  hint?: string;
  defaultValue?: any;
  options?: UiSelectOption[] | UiRadioOption[] | UiCheckboxOption[];
  validators?: DynamicFormFieldValidators;
  gridCols?: 1 | 2 | 3;
  dependsOn?: DynamicFormFieldDependsOn;
  rows?: number;
  accept?: string;
  multiple?: boolean;
  clearable?: boolean;
}

export interface DynamicFormSchema {
  title?: string;
  description?: string;
  submitText?: string;
  showReset?: boolean;
  resetText?: string;
  layout?: 'stacked' | 'grid-2' | 'grid-3';
  fields: DynamicFormField[];
}

export type ErrorMessageResolver = (error: any, fieldLabel?: string) => string;

export interface FormValidationDictionary {
  [key: string]: ErrorMessageResolver;
}
