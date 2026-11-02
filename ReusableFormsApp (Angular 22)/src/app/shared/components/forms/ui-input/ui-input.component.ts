import {
  Component,
  ChangeDetectionStrategy,
  input,
  signal,
  computed,
  inject,
  forwardRef,
  ElementRef,
  ViewChild,
  OnInit,
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

let nextInputId = 0;

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ui-input-field" [class.has-error]="isInvalid()" [class.is-disabled]="isDisabled()">
      @if (label()) {
        <div class="ui-input-header">
          <label [for]="inputId()" class="ui-input-label">
            {{ label() }}
            @if (required()) {
              <span class="ui-input-required" aria-hidden="true">*</span>
            }
          </label>
          @if (optional()) {
            <span class="ui-input-optional">Optional</span>
          }
        </div>
      }

      <div class="ui-input-box" [class.is-focused]="isFocused()">
        @if (prefixIcon()) {
          <span class="ui-input-affix ui-prefix">{{ prefixIcon() }}</span>
        }

        <input
          #inputEl
          [id]="inputId()"
          [type]="actualType()"
          [value]="value()"
          [placeholder]="placeholder()"
          [disabled]="isDisabled()"
          [readonly]="readonly()"
          [attr.min]="min()"
          [attr.max]="max()"
          [attr.step]="step()"
          [attr.maxlength]="maxlength()"
          [attr.aria-invalid]="isInvalid()"
          [attr.aria-describedby]="describedBy()"
          [attr.aria-required]="required()"
          (input)="handleInput($event)"
          (blur)="handleBlur()"
          (focus)="handleFocus()"
          class="ui-native-input"
        />

        @if (clearable() && value() && !isDisabled() && !readonly()) {
          <button
            type="button"
            class="ui-input-btn ui-clear-btn"
            (click)="clearValue()"
            aria-label="Clear input"
            tabindex="-1"
          >
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </button>
        }

        @if (type() === 'password' && showPasswordToggle()) {
          <button
            type="button"
            class="ui-input-btn ui-pwd-btn"
            (click)="togglePasswordVisibility()"
            [attr.aria-label]="isPasswordVisible() ? 'Hide password' : 'Show password'"
            tabindex="-1"
          >
            @if (isPasswordVisible()) {
              <!-- Eye Slash Icon -->
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" />
              </svg>
            } @else {
              <!-- Eye Icon -->
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            }
          </button>
        }

        @if (suffixIcon()) {
          <span class="ui-input-affix ui-suffix">{{ suffixIcon() }}</span>
        }
      </div>

      <div class="ui-input-footer">
        @if (isInvalid() && errorMessage()) {
          <div [id]="errorId()" class="ui-input-error" role="alert">
            <svg class="ui-error-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <span>{{ errorMessage() }}</span>
          </div>
        } @else if (hint()) {
          <div [id]="hintId()" class="ui-input-hint">
            {{ hint() }}
          </div>
        } @else {
          <div></div>
        }

        @if (maxlength()) {
          <span class="ui-char-count">
            {{ charCount() }}/{{ maxlength() }}
          </span>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .ui-input-field {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
      width: 100%;
    }

    .ui-input-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
    }

    .ui-input-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--ui-form-text, #111827);
      user-select: none;
    }

    .ui-input-required {
      color: var(--ui-form-error, #ef4444);
      margin-left: 0.125rem;
      font-weight: 600;
    }

    .ui-input-optional {
      font-size: 0.75rem;
      color: var(--ui-form-text-muted, #6b7280);
      font-weight: 400;
    }

    .ui-input-box {
      display: flex;
      align-items: center;
      position: relative;
      width: 100%;
      background-color: var(--ui-form-bg, #ffffff);
      border: 1px solid var(--ui-form-border, #d1d5db);
      border-radius: var(--ui-form-radius, 8px);
      box-shadow: var(--ui-form-shadow-sm, 0 1px 2px rgba(0,0,0,0.05));
      transition: var(--ui-form-transition, all 0.15s ease);
      overflow: hidden;
    }

    .ui-input-box:hover:not(.is-disabled) {
      border-color: var(--ui-form-border-hover, #9ca3af);
    }

    .ui-input-box.is-focused {
      border-color: var(--ui-form-border-focus, #4f46e5);
      box-shadow: 0 0 0 3px var(--ui-form-primary-focus, rgba(79, 70, 229, 0.2));
    }

    .has-error .ui-input-box {
      border-color: var(--ui-form-error, #ef4444);
    }

    .has-error .ui-input-box.is-focused {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
    }

    .ui-native-input {
      flex: 1;
      width: 100%;
      border: none;
      background: transparent;
      padding: 0.625rem 0.875rem;
      font-size: 0.875rem;
      color: var(--ui-form-text, #111827);
      font-family: inherit;
      outline: none;
      line-height: 1.25;
      min-width: 0;
    }

    .ui-native-input::placeholder {
      color: var(--ui-form-text-subtle, #9ca3af);
    }

    .ui-input-affix {
      padding: 0 0.75rem;
      color: var(--ui-form-text-muted, #6b7280);
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      user-select: none;
    }

    .ui-input-btn {
      background: none;
      border: none;
      padding: 0.5rem;
      margin-right: 0.35rem;
      color: var(--ui-form-text-muted, #6b7280);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: color 0.15s ease;
    }

    .ui-input-btn:hover {
      color: var(--ui-form-text, #111827);
    }

    .ui-input-btn svg {
      width: 1.125rem;
      height: 1.125rem;
    }

    .ui-input-footer {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 0.5rem;
      min-height: 1.25rem;
      font-size: 0.775rem;
    }

    .ui-input-error {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      color: var(--ui-form-error-text, #b91c1c);
      font-weight: 500;
      animation: inputSlideDown 0.15s ease-out;
    }

    .ui-error-icon {
      width: 0.875rem;
      height: 0.875rem;
      flex-shrink: 0;
      color: var(--ui-form-error, #ef4444);
    }

    .ui-input-hint {
      color: var(--ui-form-text-muted, #6b7280);
      line-height: 1.35;
    }

    .ui-char-count {
      color: var(--ui-form-text-subtle, #9ca3af);
      font-variant-numeric: tabular-nums;
      margin-left: auto;
      white-space: nowrap;
    }

    .is-disabled {
      opacity: 0.65;
      cursor: not-allowed;
    }

    .is-disabled .ui-input-box {
      background-color: var(--ui-form-surface-alt, #f3f4f6);
    }

    @keyframes inputSlideDown {
      from {
        opacity: 0;
        transform: translateY(-4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `],
})
export class UiInputComponent implements ControlValueAccessor, OnInit {
  private errorService = inject(FormErrorService);
  private uid = `ui-input-${++nextInputId}`;

  // Optional injected NgControl for reactive forms / ngModel
  readonly ngControl = inject(NgControl, { optional: true, self: true });

  @ViewChild('inputEl') inputEl?: ElementRef<HTMLInputElement>;

  id = input<string>('');
  type = input<'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'>('text');
  label = input<string>('');
  placeholder = input<string>('');
  hint = input<string>('');
  required = input(false, { transform: booleanAttribute });
  optional = input(false, { transform: booleanAttribute });
  clearable = input(false, { transform: booleanAttribute });
  showPasswordToggle = input(true, { transform: booleanAttribute });
  readonly = input(false, { transform: booleanAttribute });
  disabled = input(false, { transform: booleanAttribute });
  prefixIcon = input<string>('');
  suffixIcon = input<string>('');
  min = input<number | null>(null);
  max = input<number | null>(null);
  step = input<number | null>(null);
  maxlength = input<number | null>(null);

  // Internal state
  value = signal<any>('');
  isFocused = signal<boolean>(false);
  isPasswordVisible = signal<boolean>(false);
  cvaDisabled = signal<boolean>(false);

  inputId = computed(() => this.id() || this.uid);
  errorId = computed(() => `${this.inputId()}-error`);
  hintId = computed(() => `${this.inputId()}-hint`);

  charCount = computed(() => {
    const val = this.value();
    return val ? String(val).length : 0;
  });

  actualType = computed(() => {
    if (this.type() === 'password' && this.isPasswordVisible()) {
      return 'text';
    }
    return this.type();
  });

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

  ngOnInit(): void {
    // Check if validators include required
    if (this.ngControl && this.ngControl.control && this.ngControl.control.validator) {
      const validators = this.ngControl.control.validator({} as any);
      if (validators && validators['required']) {
        // If required was not explicitly passed, we infer it from formControl
      }
    }
  }

  // ControlValueAccessor methods
  writeValue(val: any): void {
    this.value.set(val === null || val === undefined ? '' : val);
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

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    let val: any = target.value;
    if (this.type() === 'number') {
      val = val === '' ? null : Number(val);
    }
    this.value.set(val);
    this.onChange(val);
  }

  handleFocus(): void {
    this.isFocused.set(true);
  }

  handleBlur(): void {
    this.isFocused.set(false);
    this.onTouched();
  }

  clearValue(): void {
    this.value.set('');
    this.onChange('');
    if (this.inputEl) {
      this.inputEl.nativeElement.focus();
    }
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible.update((v) => !v);
  }
}
