import {
  Component,
  ChangeDetectionStrategy,
  input,
  signal,
  computed,
  inject,
  booleanAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormErrorService } from '../services/form-error.service';
import { UiCheckboxOption } from '../models/form.models';

let nextCheckboxGroupId = 0;

@Component({
  selector: 'ui-checkbox-group',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ui-checkbox-group" [class.has-error]="isInvalid()" [class.is-disabled]="isDisabled()">
      @if (label()) {
        <div class="ui-group-header">
          <span class="ui-group-label">
            {{ label() }}
            @if (required()) {
              <span class="ui-group-required" aria-hidden="true">*</span>
            }
          </span>
          @if (optional()) {
            <span class="ui-group-optional">Optional</span>
          }
        </div>
      }

      <div
        class="ui-options-container"
        [class.is-horizontal]="orientation() === 'horizontal'"
        role="group"
        [attr.aria-describedby]="describedBy()"
      >
        @for (opt of options(); track opt.value; let idx = $index) {
          <label class="ui-group-item" [class.is-checked]="isChecked(opt.value)" [class.is-disabled]="opt.disabled || isDisabled()">
            <input
              type="checkbox"
              [name]="groupId()"
              [value]="opt.value"
              [checked]="isChecked(opt.value)"
              [disabled]="opt.disabled || isDisabled()"
              (change)="toggleOption(opt.value)"
              (blur)="handleBlur()"
              class="ui-native-box"
            />
            <div class="ui-custom-box" [class.is-checked]="isChecked(opt.value)">
              @if (isChecked(opt.value)) {
                <svg viewBox="0 0 20 20" fill="currentColor" class="ui-check-icon">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              }
            </div>
            <div class="ui-item-text">
              <span class="ui-item-label">{{ opt.label }}</span>
              @if (opt.description) {
                <span class="ui-item-desc">{{ opt.description }}</span>
              }
            </div>
          </label>
        }
      </div>

      <div class="ui-group-footer">
        @if (isInvalid() && errorMessage()) {
          <div [id]="errorId()" class="ui-group-error" role="alert">
            <svg class="ui-error-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <span>{{ errorMessage() }}</span>
          </div>
        } @else if (hint()) {
          <div [id]="hintId()" class="ui-group-hint">{{ hint() }}</div>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .ui-checkbox-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .ui-group-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
    }

    .ui-group-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--ui-form-text, #111827);
    }

    .ui-group-required {
      color: var(--ui-form-error, #ef4444);
      margin-left: 0.125rem;
      font-weight: 600;
    }

    .ui-group-optional {
      font-size: 0.75rem;
      color: var(--ui-form-text-muted, #6b7280);
    }

    .ui-options-container {
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
    }

    .ui-options-container.is-horizontal {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 1.25rem;
    }

    .ui-group-item {
      display: flex;
      align-items: flex-start;
      gap: 0.625rem;
      cursor: pointer;
      user-select: none;
    }

    .ui-native-box {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    .ui-custom-box {
      width: 1.125rem;
      height: 1.125rem;
      border: 1px solid var(--ui-form-border, #d1d5db);
      border-radius: var(--ui-form-radius-sm, 5px);
      background-color: var(--ui-form-bg, #ffffff);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--ui-form-transition, all 0.15s ease);
      margin-top: 0.125rem;
      box-shadow: var(--ui-form-shadow-sm, 0 1px 2px rgba(0,0,0,0.05));
    }

    .ui-native-box:focus-visible ~ .ui-custom-box {
      border-color: var(--ui-form-border-focus, #4f46e5);
      box-shadow: 0 0 0 3px var(--ui-form-primary-focus, rgba(79, 70, 229, 0.25));
    }

    .ui-group-item:hover:not(.is-disabled) .ui-custom-box {
      border-color: var(--ui-form-border-hover, #9ca3af);
    }

    .ui-custom-box.is-checked {
      background-color: var(--ui-form-primary, #4f46e5);
      border-color: var(--ui-form-primary, #4f46e5);
    }

    .ui-check-icon {
      width: 0.875rem;
      height: 0.875rem;
      color: #ffffff;
    }

    .ui-item-text {
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
    }

    .ui-item-label {
      font-size: 0.875rem;
      color: var(--ui-form-text, #111827);
      line-height: 1.35;
    }

    .ui-item-desc {
      font-size: 0.775rem;
      color: var(--ui-form-text-muted, #6b7280);
    }

    .ui-group-footer {
      display: flex;
      align-items: flex-start;
      min-height: 1.25rem;
      font-size: 0.775rem;
    }

    .ui-group-error {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      color: var(--ui-form-error-text, #b91c1c);
      font-weight: 500;
    }

    .ui-error-icon {
      width: 0.875rem;
      height: 0.875rem;
      color: var(--ui-form-error, #ef4444);
    }

    .ui-group-hint {
      color: var(--ui-form-text-muted, #6b7280);
    }

    .is-disabled {
      opacity: 0.65;
      cursor: not-allowed;
    }
  `],
})
export class UiCheckboxGroupComponent implements ControlValueAccessor {
  private errorService = inject(FormErrorService);
  private uid = `ui-checkbox-group-${++nextCheckboxGroupId}`;

  readonly ngControl = inject(NgControl, { optional: true, self: true });

  id = input<string>('');
  label = input<string>('');
  hint = input<string>('');
  required = input(false, { transform: booleanAttribute });
  optional = input(false, { transform: booleanAttribute });
  disabled = input(false, { transform: booleanAttribute });
  options = input<UiCheckboxOption[]>([]);
  orientation = input<'vertical' | 'horizontal'>('vertical');

  selectedValues = signal<any[]>([]);
  cvaDisabled = signal<boolean>(false);

  groupId = computed(() => this.id() || this.uid);
  errorId = computed(() => `${this.groupId()}-error`);
  hintId = computed(() => `${this.groupId()}-hint`);

  isDisabled = computed(() => this.disabled() || this.cvaDisabled());

  isInvalid = computed(() => {
    if (this.ngControl && this.ngControl.control) {
      const c = this.ngControl.control;
      return !!(c.invalid && (c.touched || c.dirty));
    }
    return false;
  });

  errorMessage = computed(() => {
    if (this.ngControl && this.ngControl.control) {
      return this.errorService.resolveError(this.ngControl.control, this.label());
    }
    return '';
  });

  describedBy = computed(() => {
    if (this.isInvalid()) return this.errorId();
    if (this.hint()) return this.hintId();
    return null;
  });

  private onChange: (val: any[]) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(val: any): void {
    if (Array.isArray(val)) {
      this.selectedValues.set([...val]);
    } else {
      this.selectedValues.set([]);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }

  isChecked(val: any): boolean {
    return this.selectedValues().includes(val);
  }

  toggleOption(val: any): void {
    if (this.isDisabled()) return;
    const current = [...this.selectedValues()];
    const index = current.indexOf(val);

    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(val);
    }

    this.selectedValues.set(current);
    this.onChange(current);
    this.onTouched();
  }

  handleBlur(): void {
    this.onTouched();
  }
}
