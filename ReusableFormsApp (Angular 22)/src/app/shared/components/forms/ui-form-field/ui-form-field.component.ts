import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
  inject,
  booleanAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { FormErrorService } from '../services/form-error.service';

let nextUniqueId = 0;

@Component({
  selector: 'ui-form-field',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ui-form-field.component.html',
  styleUrl: './ui-form-field.component.css',
})
export class UiFormFieldComponent {
  private errorService = inject(FormErrorService);
  private uid = `ui-field-${++nextUniqueId}`;

  id = input<string>('');
  label = input<string>('');
  hint = input<string>('');
  required = input(false, { transform: booleanAttribute });
  optional = input(false, { transform: booleanAttribute });
  disabled = input(false, { transform: booleanAttribute });
  errorMessage = input<string>('');
  control = input<AbstractControl | null>(null);
  maxlength = input<number | null>(null);
  currentLength = input<number>(0);

  fieldId = computed(() => this.id() || this.uid);
  errorId = computed(() => `${this.fieldId()}-error`);
  hintId = computed(() => `${this.fieldId()}-hint`);

  displayError = computed(() => {
    if (this.errorMessage()) return this.errorMessage();
    const ctrl = this.control();
    if (ctrl) {
      return this.errorService.resolveError(ctrl, this.label());
    }
    return '';
  });

  hasError = computed(() => !!this.displayError());
}
