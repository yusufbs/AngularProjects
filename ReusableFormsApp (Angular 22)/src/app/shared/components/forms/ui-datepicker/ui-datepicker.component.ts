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

let nextDatepickerId = 0;

@Component({
  selector: 'ui-datepicker',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ui-datepicker.component.html',
  styleUrl: './ui-datepicker.component.css',
})
export class UiDatepickerComponent implements ControlValueAccessor {
  private errorService = inject(FormErrorService);
  private uid = `ui-datepicker-${++nextDatepickerId}`;

  readonly ngControl = inject(NgControl, { optional: true, self: true });

  id = input<string>('');
  label = input<string>('');
  hint = input<string>('');
  required = input(false, { transform: booleanAttribute });
  optional = input(false, { transform: booleanAttribute });
  disabled = input(false, { transform: booleanAttribute });
  min = input<string | null | undefined>(null);
  max = input<string | null | undefined>(null);
  quickPresets = input(false, { transform: booleanAttribute });

  value = signal<string>('');
  isFocused = signal<boolean>(false);
  cvaDisabled = signal<boolean>(false);

  dateId = computed(() => this.id() || this.uid);
  errorId = computed(() => `${this.dateId()}-error`);
  hintId = computed(() => `${this.dateId()}-hint`);

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
    this.value.set(val || '');
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
    const val = (event.target as HTMLInputElement).value;
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

  setPresetDays(daysToAdd: number): void {
    if (this.isDisabled()) return;
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const formatted = `${yyyy}-${mm}-${dd}`;
    this.value.set(formatted);
    this.onChange(formatted);
    this.onTouched();
  }
}

