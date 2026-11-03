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
  templateUrl: './ui-switch.component.html',
  styleUrl: './ui-switch.component.css',
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
