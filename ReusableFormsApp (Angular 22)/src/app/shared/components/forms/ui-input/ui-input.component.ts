import {
  Component,
  ChangeDetectionStrategy,
  input,
  signal,
  computed,
  inject,
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
  templateUrl: './ui-input.component.html',
  styleUrl: './ui-input.component.css',
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
  min = input<number | string | null | undefined>(null);
  max = input<number | string | null | undefined>(null);
  step = input<number | string | null | undefined>(null);
  maxlength = input<number | string | null | undefined>(null);

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

  ngOnInit(): void {}

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
