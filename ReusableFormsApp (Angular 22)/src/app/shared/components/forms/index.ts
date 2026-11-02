// Export Components
export * from './ui-form/ui-form.component';
export * from './ui-form-field/ui-form-field.component';
export * from './ui-input/ui-input.component';
export * from './ui-textarea/ui-textarea.component';
export * from './ui-select/ui-select.component';
export * from './ui-checkbox/ui-checkbox.component';
export * from './ui-checkbox-group/ui-checkbox-group.component';
export * from './ui-radio-group/ui-radio-group.component';
export * from './ui-switch/ui-switch.component';
export * from './ui-datepicker/ui-datepicker.component';
export * from './ui-file-upload/ui-file-upload.component';
export * from './ui-dynamic-form/ui-dynamic-form.component';

// Export Models & Services
export * from './models/form.models';
export * from './services/form-error.service';

// Re-export Signal Forms core primitives for easy 1-line imports
export {
  FormField,
  form,
  submit,
  schema,
  required,
  email,
  minLength,
  maxLength,
  min,
  max,
  pattern,
  disabled,
  readonly,
  hidden,
} from '@angular/forms/signals';
export type { Field, FieldTree, FieldState, ValidationError } from '@angular/forms/signals';
