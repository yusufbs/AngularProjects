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
  templateUrl: './ui-checkbox.component.html',
  styleUrl: './ui-checkbox.component.css',
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
