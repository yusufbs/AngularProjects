import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  inject,
  ElementRef,
  booleanAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldTree, submit } from '@angular/forms/signals';
import { FormErrorService } from '../services/form-error.service';

@Component({
  selector: 'ui-form',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ui-form.component.html',
  styleUrl: './ui-form.component.css',
})
export class UiFormComponent {
  private elementRef = inject(ElementRef);
  private errorService = inject(FormErrorService);

  form = input.required<FieldTree<Record<string, any>> | any>();
  submitText = input<string>('Submit');
  showReset = input(false, { transform: booleanAttribute });
  resetText = input<string>('Reset');
  showErrorSummary = input(true, { transform: booleanAttribute });
  layout = input<'stacked' | 'grid-2' | 'grid-3'>('stacked');
  loading = input(false, { transform: booleanAttribute });

  formSubmit = output<any>();
  formReset = output<void>();
  invalidSubmit = output<any>();

  submitted = signal<boolean>(false);

  hasErrors = computed(() => {
    const f = this.form();
    return f ? f().invalid() : false;
  });

  errorSummaryList = computed(() => {
    const f = this.form();
    if (!f) return [];
    const errors = f().errors();
    return (errors as any[]).map((err: any) => {
      const msg = err.message || this.errorService.resolveSignalError(err);
      return {
        label: err.kind,
        message: msg,
      };
    });
  });

  async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.submitted.set(true);

    const f = this.form();
    if (!f) return;

    const success = await submit(f, async () => {
      this.formSubmit.emit(f().value());
    });

    if (!success) {
      this.focusFirstInvalid();
      this.invalidSubmit.emit(f().errors());
    }
  }

  handleReset(): void {
    this.submitted.set(false);
    const f = this.form();
    if (f) {
      f().reset();
    }
    this.formReset.emit();
  }

  private focusFirstInvalid(): void {
    if (typeof document !== 'undefined') {
      setTimeout(() => {
        const root = this.elementRef.nativeElement || document;
        const invalidEl = root.querySelector(
          '.ng-invalid:not(form):not(fieldset), [aria-invalid="true"]'
        ) as HTMLElement | null;

        if (invalidEl) {
          invalidEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (typeof invalidEl.focus === 'function') {
            invalidEl.focus();
          }
        }
      }, 50);
    }
  }
}
