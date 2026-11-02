import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  inject,
  OnInit,
  OnChanges,
  SimpleChanges,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
} from '@angular/forms';
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

@Component({
  selector: 'ui-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
  template: `
    @if (formGroup()) {
      <div class="ui-dynamic-form-wrap">
        @if (schema().title || schema().description) {
          <div class="ui-dynamic-header">
            @if (schema().title) {
              <h3 class="ui-dynamic-title">{{ schema().title }}</h3>
            }
            @if (schema().description) {
              <p class="ui-dynamic-desc">{{ schema().description }}</p>
            }
          </div>
        }

        <ui-form
          [formGroup]="formGroup()!"
          [submitText]="schema().submitText || 'Submit'"
          [showReset]="schema().showReset ?? true"
          [resetText]="schema().resetText || 'Reset'"
          [layout]="schema().layout || 'stacked'"
          (formSubmit)="formSubmit.emit($event)"
          (formReset)="formReset.emit()"
        >
          <div class="ui-dynamic-fields-grid" [class.is-grid-2]="schema().layout === 'grid-2'">
            @for (field of schema().fields; track field.name) {
              @if (isFieldVisible(field)) {
                <div
                  class="ui-dynamic-field-col"
                  [style.grid-column]="field.gridCols ? 'span ' + field.gridCols : 'span 1'"
                >
                  @switch (field.type) {
                    @case ('text') {
                      <ui-input
                        [formControlName]="field.name"
                        type="text"
                        [label]="field.label"
                        [placeholder]="field.placeholder || ''"
                        [hint]="field.hint || ''"
                        [required]="!!field.validators?.required"
                        [clearable]="field.clearable ?? false"
                      />
                    }
                    @case ('email') {
                      <ui-input
                        [formControlName]="field.name"
                        type="email"
                        [label]="field.label"
                        [placeholder]="field.placeholder || ''"
                        [hint]="field.hint || ''"
                        [required]="!!field.validators?.required"
                        [clearable]="field.clearable ?? false"
                      />
                    }
                    @case ('password') {
                      <ui-input
                        [formControlName]="field.name"
                        type="password"
                        [label]="field.label"
                        [placeholder]="field.placeholder || ''"
                        [hint]="field.hint || ''"
                        [required]="!!field.validators?.required"
                      />
                    }
                    @case ('number') {
                      <ui-input
                        [formControlName]="field.name"
                        type="number"
                        [label]="field.label"
                        [placeholder]="field.placeholder || ''"
                        [hint]="field.hint || ''"
                        [min]="field.validators?.min ?? null"
                        [max]="field.validators?.max ?? null"
                        [required]="!!field.validators?.required"
                      />
                    }
                    @case ('textarea') {
                      <ui-textarea
                        [formControlName]="field.name"
                        [label]="field.label"
                        [placeholder]="field.placeholder || ''"
                        [hint]="field.hint || ''"
                        [rows]="field.rows || 4"
                        [maxlength]="field.validators?.maxLength ?? null"
                        [required]="!!field.validators?.required"
                      />
                    }
                    @case ('select') {
                      <ui-select
                        [formControlName]="field.name"
                        [label]="field.label"
                        [placeholder]="field.placeholder || 'Select an option...'"
                        [hint]="field.hint || ''"
                        [options]="asSelectOptions(field.options)"
                        [required]="!!field.validators?.required"
                        searchable
                        clearable
                      />
                    }
                    @case ('checkbox') {
                      <ui-checkbox
                        [formControlName]="field.name"
                        [label]="field.label"
                        [description]="field.placeholder || ''"
                        [hint]="field.hint || ''"
                        [required]="!!field.validators?.required"
                      />
                    }
                    @case ('checkbox-group') {
                      <ui-checkbox-group
                        [formControlName]="field.name"
                        [label]="field.label"
                        [hint]="field.hint || ''"
                        [options]="asCheckboxOptions(field.options)"
                        [required]="!!field.validators?.required"
                      />
                    }
                    @case ('radio') {
                      <ui-radio-group
                        [formControlName]="field.name"
                        [label]="field.label"
                        [hint]="field.hint || ''"
                        [options]="asRadioOptions(field.options)"
                        [required]="!!field.validators?.required"
                      />
                    }
                    @case ('switch') {
                      <ui-switch
                        [formControlName]="field.name"
                        [label]="field.label"
                        [description]="field.hint || ''"
                        [required]="!!field.validators?.required"
                      />
                    }
                    @case ('date') {
                      <ui-datepicker
                        [formControlName]="field.name"
                        [label]="field.label"
                        [hint]="field.hint || ''"
                        [required]="!!field.validators?.required"
                        quickPresets
                      />
                    }
                    @case ('file') {
                      <ui-file-upload
                        [formControlName]="field.name"
                        [label]="field.label"
                        [hint]="field.hint || ''"
                        [accept]="field.accept || '*'"
                        [multiple]="field.multiple ?? false"
                        [required]="!!field.validators?.required"
                      />
                    }
                  }
                </div>
              }
            }
          </div>
        </ui-form>
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .ui-dynamic-form-wrap {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      width: 100%;
    }

    .ui-dynamic-header {
      border-bottom: 1px solid var(--ui-form-border, #e5e7eb);
      padding-bottom: 0.75rem;
    }

    .ui-dynamic-title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--ui-form-text, #111827);
    }

    .ui-dynamic-desc {
      margin: 0.25rem 0 0 0;
      font-size: 0.875rem;
      color: var(--ui-form-text-muted, #6b7280);
    }

    .ui-dynamic-fields-grid {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      width: 100%;
    }

    .ui-dynamic-fields-grid.is-grid-2 {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.25rem;
    }

    @media (max-width: 768px) {
      .ui-dynamic-fields-grid.is-grid-2 {
        grid-template-columns: 1fr !important;
      }
      .ui-dynamic-field-col {
        grid-column: span 1 !important;
      }
    }
  `],
})
export class UiDynamicFormComponent implements OnInit, OnChanges {
  private fb = inject(FormBuilder);

  schema = input.required<DynamicFormSchema>();
  formSubmit = output<any>();
  formReset = output<void>();

  formGroup = signal<FormGroup | null>(null);
  currentValues = signal<Record<string, any>>({});

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['schema'] && !changes['schema'].firstChange) {
      this.buildForm();
    }
  }

  private buildForm(): void {
    const s = this.schema();
    if (!s || !s.fields) return;

    const groupConfig: Record<string, any> = {};

    s.fields.forEach((field) => {
      const validators: ValidatorFn[] = [];
      const v = field.validators;
      if (v) {
        if (v.required) {
          if (field.type === 'checkbox') {
            validators.push(Validators.requiredTrue);
          } else {
            validators.push(Validators.required);
          }
        }
        if (v.email || field.type === 'email') validators.push(Validators.email);
        if (v.min !== undefined) validators.push(Validators.min(v.min));
        if (v.max !== undefined) validators.push(Validators.max(v.max));
        if (v.minLength !== undefined) validators.push(Validators.minLength(v.minLength));
        if (v.maxLength !== undefined) validators.push(Validators.maxLength(v.maxLength));
        if (v.pattern) validators.push(Validators.pattern(v.pattern));
      }

      const initialValue =
        field.defaultValue !== undefined
          ? field.defaultValue
          : field.type === 'checkbox'
          ? false
          : field.type === 'checkbox-group'
          ? []
          : '';

      groupConfig[field.name] = [initialValue, validators];
    });

    const fg = this.fb.group(groupConfig);
    this.formGroup.set(fg);
    this.currentValues.set(fg.value);

    fg.valueChanges.subscribe((val) => {
      this.currentValues.set({ ...val });
    });
  }

  isFieldVisible(field: DynamicFormField): boolean {
    if (!field.dependsOn) return true;
    const dep = field.dependsOn;
    const val = this.currentValues()[dep.field];

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
