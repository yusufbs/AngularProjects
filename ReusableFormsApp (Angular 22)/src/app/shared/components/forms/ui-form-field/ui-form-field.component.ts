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
  template: `
    <div class="ui-field" [class.has-error]="hasError()" [class.is-disabled]="disabled()">
      @if (label()) {
        <div class="ui-field-header">
          <label [for]="fieldId()" class="ui-field-label">
            {{ label() }}
            @if (required()) {
              <span class="ui-field-required" aria-hidden="true">*</span>
            }
          </label>
          @if (optional()) {
            <span class="ui-field-optional">Optional</span>
          }
        </div>
      }

      <div class="ui-field-control-wrap">
        <ng-content select="[prefix]"></ng-content>
        <div class="ui-field-input-host">
          <ng-content></ng-content>
        </div>
        <ng-content select="[suffix]"></ng-content>
      </div>

      <div class="ui-field-footer">
        @if (hasError()) {
          <div [id]="errorId()" class="ui-field-error" role="alert">
            <svg class="ui-error-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <span>{{ displayError() }}</span>
          </div>
        } @else if (hint()) {
          <div [id]="hintId()" class="ui-field-hint">
            {{ hint() }}
          </div>
        } @else {
          <div></div>
        }

        @if (maxlength()) {
          <span class="ui-field-count" [class.at-limit]="currentLength() >= maxlength()!">
            {{ currentLength() }}/{{ maxlength() }}
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

    .ui-field {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
      width: 100%;
    }

    .ui-field-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
    }

    .ui-field-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--ui-form-text, #111827);
      user-select: none;
    }

    .ui-field-required {
      color: var(--ui-form-error, #ef4444);
      margin-left: 0.125rem;
      font-weight: 600;
    }

    .ui-field-optional {
      font-size: 0.75rem;
      color: var(--ui-form-text-muted, #6b7280);
      font-weight: 400;
    }

    .ui-field-control-wrap {
      display: flex;
      align-items: center;
      position: relative;
      width: 100%;
    }

    .ui-field-input-host {
      flex: 1;
      width: 100%;
      min-width: 0;
    }

    .ui-field-footer {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 0.5rem;
      min-height: 1.25rem;
      font-size: 0.775rem;
    }

    .ui-field-error {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      color: var(--ui-form-error-text, #b91c1c);
      font-weight: 500;
      animation: fieldSlideDown 0.15s ease-out;
    }

    .ui-error-icon {
      width: 0.875rem;
      height: 0.875rem;
      flex-shrink: 0;
      color: var(--ui-form-error, #ef4444);
    }

    .ui-field-hint {
      color: var(--ui-form-text-muted, #6b7280);
      line-height: 1.35;
    }

    .ui-field-count {
      color: var(--ui-form-text-subtle, #9ca3af);
      font-variant-numeric: tabular-nums;
      margin-left: auto;
      white-space: nowrap;
    }

    .ui-field-count.at-limit {
      color: var(--ui-form-error, #ef4444);
      font-weight: 600;
    }

    .is-disabled {
      opacity: 0.65;
      pointer-events: none;
    }

    @keyframes fieldSlideDown {
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
