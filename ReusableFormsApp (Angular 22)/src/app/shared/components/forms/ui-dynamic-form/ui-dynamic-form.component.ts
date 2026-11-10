import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  inject,
  Injector,
  runInInjectionContext,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DynamicFormField,
  DynamicFormSchema,
  UiSelectOption,
  UiRadioOption,
  UiCheckboxOption,
} from '../models/form.models';
import { UiFormComponent } from '../ui-form/ui-form.component';
import { UiInputComponent } from '../ui-input/ui-input.component';
import { UiTextareaComponent } from '../ui-textarea/ui-textarea.component';
import { UiSelectComponent } from '../ui-select/ui-select.component';
import { UiCheckboxComponent } from '../ui-checkbox/ui-checkbox.component';
import { UiCheckboxGroupComponent } from '../ui-checkbox-group/ui-checkbox-group.component';
import { UiRadioGroupComponent } from '../ui-radio-group/ui-radio-group.component';
import { UiSwitchComponent } from '../ui-switch/ui-switch.component';
import { UiDatepickerComponent } from '../ui-datepicker/ui-datepicker.component';
import { UiFileUploadComponent } from '../ui-file-upload/ui-file-upload.component';
import {
  FormField,
  form,
  required,
  email,
  min,
  max,
  minLength,
  maxLength,
  pattern,
  FieldTree,
} from '@angular/forms/signals';

@Component({
  selector: 'ui-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    FormField,
    UiFormComponent,
    UiInputComponent,
    UiTextareaComponent,
    UiSelectComponent,
    UiCheckboxComponent,
    UiCheckboxGroupComponent,
    UiRadioGroupComponent,
    UiSwitchComponent,
    UiDatepickerComponent,
    UiFileUploadComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ui-dynamic-form.component.html',
  styleUrl: './ui-dynamic-form.component.css',
})
export class UiDynamicFormComponent implements OnInit, OnChanges {
  private injector = inject(Injector);

  schema = input.required<DynamicFormSchema>();
  formSubmit = output<any>();
  formReset = output<void>();

  // Signal Forms State
  modelSignal = signal<Record<string, any>>({});
  formTree = signal<FieldTree<Record<string, any>> | any>(null);

  ngOnInit(): void {
    this.buildSignalForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['schema'] && !changes['schema'].firstChange) {
      this.buildSignalForm();
    }
  }

  private buildSignalForm(): void {
    const s = this.schema();
    if (!s || !s.fields) return;

    const initialModel: Record<string, any> = {};

    s.fields.forEach((field) => {
      const defaultVal =
        field.defaultValue !== undefined
          ? field.defaultValue
          : field.type === 'checkbox'
          ? false
          : field.type === 'checkbox-group'
          ? []
          : '';
      initialModel[field.name] = defaultVal;
    });

    this.modelSignal.set(initialModel);

    // Build Signal Forms FieldTree with schema rules inside injection context!
    runInInjectionContext(this.injector, () => {
      const dynamicTree = form(this.modelSignal, (schemaBuilder: any) => {
        s.fields.forEach((field) => {
          const fieldRef = schemaBuilder[field.name];
          if (!fieldRef) return;

          const v = field.validators;
          if (v) {
            if (v.required) {
              required(fieldRef, { message: `${field.label} is required.` });
            }
            if (v.email || field.type === 'email') {
              email(fieldRef, { message: 'Must be a valid email.' });
            }
            if (v.min !== undefined) {
              min(fieldRef, v.min, { message: `Minimum value is ${v.min}.` });
            }
            if (v.max !== undefined) {
              max(fieldRef, v.max, { message: `Maximum value is ${v.max}.` });
            }
            if (v.minLength !== undefined) {
              minLength(fieldRef, v.minLength, { message: `At least ${v.minLength} characters.` });
            }
            if (v.maxLength !== undefined) {
              maxLength(fieldRef, v.maxLength, { message: `At most ${v.maxLength} characters.` });
            }
            if (v.pattern) {
              pattern(fieldRef, typeof v.pattern === 'string' ? new RegExp(v.pattern) : v.pattern, {
                message: 'Invalid format.',
              });
            }
          }
        });
      });

      this.formTree.set(dynamicTree);
    });
  }

  asField(fieldName: string): any {
    const tree: any = this.formTree();
    return tree ? tree[fieldName] : null;
  }

  isFieldVisible(field: DynamicFormField): boolean {
    if (!field.dependsOn) return true;
    const dep = field.dependsOn;
    const currentModel = this.modelSignal();
    const val = currentModel[dep.field];

    if (dep.operator === 'notEquals') {
      return val !== dep.value;
    }
    if (dep.operator === 'includes') {
      return Array.isArray(val) && val.includes(dep.value);
    }
    return val === dep.value;
  }

  asSelectOptions(opts?: any[]): UiSelectOption[] {
    return (opts as UiSelectOption[]) || [];
  }

  asRadioOptions(opts?: any[]): UiRadioOption[] {
    return (opts as UiRadioOption[]) || [];
  }

  asCheckboxOptions(opts?: any[]): UiCheckboxOption[] {
    return (opts as UiCheckboxOption[]) || [];
  }
}

