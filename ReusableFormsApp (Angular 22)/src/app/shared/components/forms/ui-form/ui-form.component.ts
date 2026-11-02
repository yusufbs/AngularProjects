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
import { FieldTree, submit, FormField } from '@angular/forms/signals';
import { FormErrorService } from '../services/form-error.service';

@Component({
  selector: 'ui-form',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form
      (submit)="handleSubmit($event)"
      class="ui-form"
      [class.layout-stacked]="layout() === 'stacked'"
      [class.layout-grid-2]="layout() === 'grid-2'"
      [class.layout-grid-3]="layout() === 'grid-3'"
      novalidate
    >
      @if (showErrorSummary() && submitted() && hasErrors()) {
        <div class="ui-form-summary" role="alert" aria-live="polite">
          <div class="ui-summary-header">
            <svg class="ui-summary-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            <span class="ui-summary-title">Please correct the errors in the form before submitting:</span>
          </div>
          <ul class="ui-summary-list">
            @for (err of errorSummaryList(); track err.label) {
              <li>{{ err.message }}</li>
            }
          </ul>
        </div>
      }

      <div class="ui-form-body">
        <ng-content></ng-content>
      </div>

      <div class="ui-form-actions">
        <ng-content select="[actions]">
          <div class="ui-default-actions">
            @if (showReset()) {
              <button
                type="button"
                class="ui-btn ui-btn-secondary"
                [disabled]="loading()"
                (click)="handleReset()"
              >
                {{ resetText() }}
              </button>
            }
            <button
              type="submit"
              class="ui-btn ui-btn-primary"
              [disabled]="loading()"
              [class.is-loading]="loading()"
            >
              @if (loading()) {
                <span class="ui-spinner" aria-hidden="true"></span>
              }
              <span>{{ submitText() }}</span>
            </button>
          </div>
        </ng-content>
      </div>
    </form>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .ui-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      width: 100%;
    }

    .ui-form-body {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      width: 100%;
    }

    .layout-grid-2 .ui-form-body {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.25rem;
    }

    .layout-grid-3 .ui-form-body {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1.25rem;
    }

    @media (max-width: 768px) {
      .layout-grid-2 .ui-form-body,
      .layout-grid-3 .ui-form-body {
        grid-template-columns: 1fr;
      }
    }

    .ui-form-summary {
      background-color: var(--ui-form-error-bg, #fef2f2);
      border: 1px solid var(--ui-form-error-border, #fca5a5);
      border-radius: var(--ui-form-radius, 8px);
      padding: 1rem;
      color: var(--ui-form-error-text, #b91c1c);
      font-size: 0.875rem;
    }

    .ui-summary-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .ui-summary-icon {
      width: 1.25rem;
      height: 1.25rem;
      flex-shrink: 0;
      color: var(--ui-form-error, #ef4444);
    }

    .ui-summary-list {
      margin: 0;
      padding-left: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .ui-form-actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-top: 0.75rem;
      border-top: 1px solid var(--ui-form-border, #e5e7eb);
    }

    .ui-default-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .ui-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.625rem 1.25rem;
      font-size: 0.875rem;
      font-weight: 500;
      border-radius: var(--ui-form-radius, 8px);
      border: 1px solid transparent;
      cursor: pointer;
      transition: var(--ui-form-transition, all 0.15s ease);
      line-height: 1.25;
      user-select: none;
    }

    .ui-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .ui-btn-primary {
      background-color: var(--ui-form-primary, #4f46e5);
      color: #ffffff;
      box-shadow: var(--ui-form-shadow-sm, 0 1px 2px rgba(0,0,0,0.05));
    }

    .ui-btn-primary:hover:not(:disabled) {
      background-color: var(--ui-form-primary-hover, #4338ca);
    }

    .ui-btn-secondary {
      background-color: #ffffff;
      border-color: var(--ui-form-border, #d1d5db);
      color: var(--ui-form-text, #374151);
    }

    .ui-btn-secondary:hover:not(:disabled) {
      background-color: var(--ui-form-surface-alt, #f9fafb);
      border-color: var(--ui-form-border-hover, #9ca3af);
    }

    .ui-spinner {
      width: 1rem;
      height: 1rem;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: #ffffff;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `],
})
export class UiFormComponent {
  private elementRef = inject(ElementRef);
  private errorService = inject(FormErrorService);

  // New Signal Forms FieldTree input!
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


