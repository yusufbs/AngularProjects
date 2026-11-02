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

let nextSwitchId = 0;

@Component({
  selector: 'ui-switch',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ui-switch-field" [class.has-error]="isInvalid()" [class.is-disabled]="isDisabled()">
      <label
        [for]="switchId()"
        class="ui-switch-label-wrap"
        [class.label-left]="labelPosition() === 'left'"
      >
        <div class="ui-switch-track-container">
          <input
            type="checkbox"
            role="switch"
            [id]="switchId()"
            [checked]="checked()"
            [disabled]="isDisabled()"
            [attr.aria-checked]="checked()"
            [attr.aria-invalid]="isInvalid()"
            [attr.aria-describedby]="describedBy()"
            (change)="handleChange($event)"
            (blur)="handleBlur()"
            class="ui-native-switch"
          />
          <div class="ui-custom-switch" [class.is-checked]="checked()">
            <span class="ui-switch-thumb" [class.is-checked]="checked()"></span>
          </div>
        </div>

        @if (label()) {
          <div class="ui-switch-content">
            <span class="ui-switch-title">
              {{ label() }}
              @if (required()) {
                <span class="ui-switch-required" aria-hidden="true">*</span>
              }
            </span>
            @if (description()) {
              <span class="ui-switch-desc">{{ description() }}</span>
            }
          </div>
        }
      </label>

      @if (isInvalid() && errorMessage()) {
        <div [id]="errorId()" class="ui-switch-error" role="alert">
          <svg class="ui-error-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          <span>{{ errorMessage() }}</span>
        </div>
      } @else if (hint()) {
        <div [id]="hintId()" class="ui-switch-hint">{{ hint() }}</div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .ui-switch-field {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .ui-switch-label-wrap {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      user-select: none;
    }

    .ui-switch-label-wrap.label-left {
      flex-direction: row-reverse;
      justify-content: space-between;
    }

    .ui-switch-track-container {
      position: relative;
      display: inline-flex;
      align-items: center;
    }

    .ui-native-switch {
      position: absolute;
      opacity: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      cursor: pointer;
      z-index: 1;
    }

    .ui-custom-switch {
      width: 2.5rem;
      height: 1.375rem;
      border-radius: 9999px;
      background-color: var(--ui-form-border, #d1d5db);
      position: relative;
      transition: background-color 0.2s ease;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .ui-native-switch:focus-visible ~ .ui-custom-switch {
      box-shadow: 0 0 0 3px var(--ui-form-primary-focus, rgba(79, 70, 229, 0.25));
    }

    .ui-custom-switch.is-checked {
      background-color: var(--ui-form-primary, #4f46e5);
    }

    .ui-switch-thumb {
      position: absolute;
      top: 0.125rem;
      left: 0.125rem;
      width: 1.125rem;
      height: 1.125rem;
      border-radius: 50%;
      background-color: #ffffff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .ui-switch-thumb.is-checked {
      transform: translateX(1.125rem);
    }

    .ui-switch-content {
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
    }

    .ui-switch-title {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--ui-form-text, #111827);
      line-height: 1.35;
    }

    .ui-switch-required {
      color: var(--ui-form-error, #ef4444);
      margin-left: 0.125rem;
    }

    .ui-switch-desc {
      font-size: 0.775rem;
      color: var(--ui-form-text-muted, #6b7280);
      line-height: 1.35;
    }

    .ui-switch-error {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      color: var(--ui-form-error-text, #b91c1c);
      font-size: 0.775rem;
      font-weight: 500;
      margin-top: 0.25rem;
    }

    .ui-error-icon {
      width: 0.875rem;
      height: 0.875rem;
      color: var(--ui-form-error, #ef4444);
    }

    .ui-switch-hint {
      font-size: 0.775rem;
      color: var(--ui-form-text-muted, #6b7280);
      margin-top: 0.25rem;
    }

    .is-disabled {
      opacity: 0.65;
      cursor: not-allowed;
    }
  `],
})
export class UiSwitchComponent implements ControlValueAccessor {
  private errorService = inject(FormErrorService);
  private uid = `ui-switch-${++nextSwitchId}`;

  readonly ngControl = inject(NgControl, { optional: true, self: true });

  id = input<string>('');
  label = input<string>('');
  description = input<string>('');
  hint = input<string>('');
  required = input(false, { transform: booleanAttribute });
  disabled = input(false, { transform: booleanAttribute });
  labelPosition = input<'left' | 'right'>('right');

  checked = signal<boolean>(false);
  cvaDisabled = signal<boolean>(false);

  switchId = computed(() => this.id() || this.uid);
  errorId = computed(() => `${this.switchId()}-error`);
  hintId = computed(() => `${this.switchId()}-hint`);

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
