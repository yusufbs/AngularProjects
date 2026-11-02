import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
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
  template: `
    @if (formTree()) {
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
          [form]="formTree()!"
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
                        [formField]="asField(field.name)"
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
                        [formField]="asField(field.name)"
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
                        [formField]="asField(field.name)"
                        type="password"
                        [label]="field.label"
                        [placeholder]="field.placeholder || ''"
                        [hint]="field.hint || ''"
                        [required]="!!field.validators?.required"
                      />
                    }
                    @case ('number') {
                      <ui-input
                        [formField]="asField(field.name)"
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
                        [formField]="asField(field.name)"
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
                        [formField]="asField(field.name)"
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
                        [formField]="asField(field.name)"
                        [label]="field.label"
                        [description]="field.placeholder || ''"
                        [hint]="field.hint || ''"
                        [required]="!!field.validators?.required"
                      />
                    }
                    @case ('checkbox-group') {
                      <ui-checkbox-group
                        [formField]="asField(field.name)"
                        [label]="field.label"
                        [hint]="field.hint || ''"
                        [options]="asCheckboxOptions(field.options)"
                        [required]="!!field.validators?.required"
                      />
                    }
                    @case ('radio') {
                      <ui-radio-group
                        [formField]="asField(field.name)"
                        [label]="field.label"
                        [hint]="field.hint || ''"
                        [options]="asRadioOptions(field.options)"
                        [required]="!!field.validators?.required"
                      />
                    }
                    @case ('switch') {
                      <ui-switch
                        [formField]="asField(field.name)"
                        [label]="field.label"
                        [description]="field.hint || ''"
                        [required]="!!field.validators?.required"
                      />
                    }
                    @case ('date') {
                      <ui-datepicker
                        [formField]="asField(field.name)"
                        [label]="field.label"
                        [hint]="field.hint || ''"
                        [required]="!!field.validators?.required"
                        quickPresets
                      />
                    }
                    @case ('file') {
                      <ui-file-upload
                        [formField]="asField(field.name)"
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

    // Build Signal Forms FieldTree with schema rules!
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

