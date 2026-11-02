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

let nextCheckboxId = 0;

@Component({
  selector: 'ui-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ui-checkbox-field" [class.has-error]="isInvalid()" [class.is-disabled]="isDisabled()">
      <label [for]="checkboxId()" class="ui-checkbox-label-wrap">
        <div class="ui-checkbox-box-container">
          <input
            type="checkbox"
            [id]="checkboxId()"
            [checked]="checked()"
            [disabled]="isDisabled()"
            [indeterminate]="indeterminate()"
            [attr.aria-invalid]="isInvalid()"
            [attr.aria-describedby]="describedBy()"
            (change)="handleChange($event)"
            (blur)="handleBlur()"
            class="ui-native-checkbox"
          />
          <div class="ui-custom-checkbox" [class.is-checked]="checked()" [class.is-indeterminate]="indeterminate()">
            @if (indeterminate()) {
              <!-- Horizontal Dash Icon -->
              <svg viewBox="0 0 20 20" fill="currentColor" class="ui-check-icon">
                <rect x="4" y="9" width="12" height="2" rx="1" />
              </svg>
            } @else if (checked()) {
              <!-- Checkmark Icon -->
              <svg viewBox="0 0 20 20" fill="currentColor" class="ui-check-icon">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            }
          </div>
        </div>

        <div class="ui-checkbox-content">
          <span class="ui-checkbox-title">
            {{ label() }}
            @if (required()) {
              <span class="ui-checkbox-required" aria-hidden="true">*</span>
            }
          </span>
          @if (description()) {
            <span class="ui-checkbox-desc">{{ description() }}</span>
          }
        </div>
      </label>

      @if (isInvalid() && errorMessage()) {
        <div [id]="errorId()" class="ui-checkbox-error" role="alert">
          <svg class="ui-error-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          <span>{{ errorMessage() }}</span>
        </div>
      } @else if (hint()) {
        <div [id]="hintId()" class="ui-checkbox-hint">{{ hint() }}</div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .ui-checkbox-field {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .ui-checkbox-label-wrap {
      display: flex;
      align-items: flex-start;
      gap: 0.625rem;
      cursor: pointer;
      user-select: none;
    }

    .ui-checkbox-box-container {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.125rem;
    }

    .ui-native-checkbox {
      position: absolute;
      opacity: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      cursor: pointer;
      z-index: 1;
    }

    .ui-custom-checkbox {
      width: 1.125rem;
      height: 1.125rem;
      border: 1px solid var(--ui-form-border, #d1d5db);
      border-radius: var(--ui-form-radius-sm, 5px);
      background-color: var(--ui-form-bg, #ffffff);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--ui-form-transition, all 0.15s ease);
      box-shadow: var(--ui-form-shadow-sm, 0 1px 2px rgba(0,0,0,0.05));
    }

    .ui-native-checkbox:hover ~ .ui-custom-checkbox {
      border-color: var(--ui-form-border-hover, #9ca3af);
    }

    .ui-native-checkbox:focus-visible ~ .ui-custom-checkbox {
      border-color: var(--ui-form-border-focus, #4f46e5);
      box-shadow: 0 0 0 3px var(--ui-form-primary-focus, rgba(79, 70, 229, 0.25));
    }

    .ui-custom-checkbox.is-checked,
    .ui-custom-checkbox.is-indeterminate {
      background-color: var(--ui-form-primary, #4f46e5);
      border-color: var(--ui-form-primary, #4f46e5);
    }

    .has-error .ui-custom-checkbox {
      border-color: var(--ui-form-error, #ef4444);
    }

    .ui-check-icon {
      width: 0.875rem;
      height: 0.875rem;
      color: #ffffff;
    }

    .ui-checkbox-content {
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
    }

    .ui-checkbox-title {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--ui-form-text, #111827);
      line-height: 1.35;
    }

    .ui-checkbox-required {
      color: var(--ui-form-error, #ef4444);
      margin-left: 0.125rem;
    }

    .ui-checkbox-desc {
      font-size: 0.775rem;
      color: var(--ui-form-text-muted, #6b7280);
      line-height: 1.35;
    }

    .ui-checkbox-error {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      color: var(--ui-form-error-text, #b91c1c);
      font-size: 0.775rem;
      font-weight: 500;
      margin-left: 1.75rem;
    }

    .ui-error-icon {
      width: 0.875rem;
      height: 0.875rem;
      color: var(--ui-form-error, #ef4444);
    }

    .ui-checkbox-hint {
      font-size: 0.775rem;
      color: var(--ui-form-text-muted, #6b7280);
      margin-left: 1.75rem;
    }

    .is-disabled {
      opacity: 0.65;
      cursor: not-allowed;
    }
  `],
})
export class UiCheckboxComponent implements ControlValueAccessor {
  private errorService = inject(FormErrorService);
  private uid = `ui-checkbox-${++nextCheckboxId}`;

  readonly ngControl = inject(NgControl, { optional: true, self: true });

  id = input<string>('');
  label = input<string>('');
  description = input<string>('');
  hint = input<string>('');
  required = input(false, { transform: booleanAttribute });
  disabled = input(false, { transform: booleanAttribute });
  indeterminate = input(false, { transform: booleanAttribute });

  checked = signal<boolean>(false);
  cvaDisabled = signal<boolean>(false);

  checkboxId = computed(() => this.id() || this.uid);
  errorId = computed(() => `${this.checkboxId()}-error`);
  hintId = computed(() => `${this.checkboxId()}-hint`);

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

  private onChange: (val: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(val: any): void {
    this.checked.set(!!val);
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

  handleChange(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.checked.set(isChecked);
    this.onChange(isChecked);
  }

  handleBlur(): void {
    this.onTouched();
  }
}
