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
  templateUrl: './ui-checkbox-group.component.html',
  styleUrl: './ui-checkbox-group.component.css',
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
