import { Injectable, InjectionToken, inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationError } from '@angular/forms/signals';
import { FormValidationDictionary } from '../models/form.models';

export const DEFAULT_FORM_ERROR_MESSAGES: FormValidationDictionary = {
  required: (_, label) => `${label || 'This field'} is required.`,
  email: () => 'Please enter a valid email address.',
  minlength: (err, label) =>
    `${label || 'Field'} must be at least ${err.requiredLength || err.minLength || ''} characters.`,
  minLength: (err, label) =>
    `${label || 'Field'} must be at least ${err.minLength || err.requiredLength || ''} characters.`,
  maxlength: (err, label) =>
    `${label || 'Field'} cannot exceed ${err.requiredLength || err.maxLength || ''} characters.`,
  maxLength: (err, label) =>
    `${label || 'Field'} cannot exceed ${err.maxLength || err.requiredLength || ''} characters.`,
  min: (err, label) => `${label || 'Value'} must be at least ${err.min}.`,
  max: (err, label) => `${label || 'Value'} cannot exceed ${err.max}.`,
  pattern: () => 'The value entered has an invalid format.',
  fileSize: (err) => `File exceeds the maximum limit of ${err.maxSize}.`,
  requiredTrue: (_, label) => `You must agree to continue.`,
};

export const UI_FORM_ERROR_MESSAGES = new InjectionToken<FormValidationDictionary>(
  'UI_FORM_ERROR_MESSAGES',
  {
    providedIn: 'root',
    factory: () => DEFAULT_FORM_ERROR_MESSAGES,
  }
);

@Injectable({
  providedIn: 'root',
})
export class FormErrorService {
  private customMessages = inject(UI_FORM_ERROR_MESSAGES);

  resolveError(control: AbstractControl | null, fieldLabel?: string): string | null {
    if (!control || !control.errors || !(control.touched || control.dirty)) {
      return null;
    }

    const firstErrorKey = Object.keys(control.errors)[0];
    if (!firstErrorKey) return null;

    const errorData = control.errors[firstErrorKey];
    const resolver = this.customMessages[firstErrorKey] || DEFAULT_FORM_ERROR_MESSAGES[firstErrorKey];

    if (resolver) {
      return resolver(errorData, fieldLabel);
    }

    if (typeof errorData === 'string') {
      return errorData;
    }

    return `${fieldLabel || 'Field'} is invalid.`;
  }

  resolveSignalError(error: ValidationError, fieldLabel?: string): string {
    if (error.message) {
      return error.message;
    }

    const resolver = this.customMessages[error.kind] || DEFAULT_FORM_ERROR_MESSAGES[error.kind];
    if (resolver) {
      return resolver(error, fieldLabel);
    }

    return `${fieldLabel || 'Field'} error: ${error.kind}.`;
  }
}
