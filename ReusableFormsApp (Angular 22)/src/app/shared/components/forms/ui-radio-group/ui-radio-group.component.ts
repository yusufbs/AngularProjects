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
import { UiRadioOption } from '../models/form.models';

let nextRadioGroupId = 0;

@Component({
  selector: 'ui-radio-group',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ui-radio-group.component.html',
  styleUrl: './ui-radio-group.component.css',
})
export class UiRadioGroupComponent implements ControlValueAccessor {
  private errorService = inject(FormErrorService);
  private uid = `ui-radio-group-${++nextRadioGroupId}`;

  readonly ngControl = inject(NgControl, { optional: true, self: true });

  id = input<string>('');
  label = input<string>('');
  hint = input<string>('');
  required = input(false, { transform: booleanAttribute });
  optional = input(false, { transform: booleanAttribute });
  disabled = input(false, { transform: booleanAttribute });
  options = input<UiRadioOption[]>([]);
  orientation = input<'vertical' | 'horizontal'>('vertical');
  cardStyle = input(false, { transform: booleanAttribute });

  value = signal<any>(null);
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

  private onChange: (val: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(val: any): void {
    this.value.set(val);
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

  selectOption(val: any): void {
    if (this.isDisabled()) return;
    this.value.set(val);
    this.onChange(val);
    this.onTouched();
  }

  handleBlur(): void {
    this.onTouched();
  }
}
