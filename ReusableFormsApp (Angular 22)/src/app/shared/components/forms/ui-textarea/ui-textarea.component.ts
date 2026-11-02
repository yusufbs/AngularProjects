import {
  Component,
  ChangeDetectionStrategy,
  input,
  signal,
  computed,
  inject,
  ElementRef,
  ViewChild,
  AfterViewInit,
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

let nextTextareaId = 0;

@Component({
  selector: 'ui-textarea',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ui-textarea-field" [class.has-error]="isInvalid()" [class.is-disabled]="isDisabled()">
      @if (label()) {
        <div class="ui-textarea-header">
          <label [for]="textareaId()" class="ui-textarea-label">
            {{ label() }}
            @if (required()) {
              <span class="ui-textarea-required" aria-hidden="true">*</span>
            }
          </label>
          @if (optional()) {
            <span class="ui-textarea-optional">Optional</span>
          }
        </div>
      }

      <div class="ui-textarea-box" [class.is-focused]="isFocused()">
        <textarea
          #textareaEl
          [id]="textareaId()"
          [value]="value()"
          [placeholder]="placeholder()"
          [rows]="rows()"
          [disabled]="isDisabled()"
          [readonly]="readonly()"
          [attr.maxlength]="maxlength()"
          [attr.aria-invalid]="isInvalid()"
          [attr.aria-describedby]="describedBy()"
          [attr.aria-required]="required()"
          (input)="handleInput($event)"
          (blur)="handleBlur()"
          (focus)="handleFocus()"
          class="ui-native-textarea"
        ></textarea>
      </div>

      <div class="ui-textarea-footer">
        @if (isInvalid() && errorMessage()) {
          <div [id]="errorId()" class="ui-textarea-error" role="alert">
            <svg class="ui-error-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <span>{{ errorMessage() }}</span>
          </div>
        } @else if (hint()) {
          <div [id]="hintId()" class="ui-textarea-hint">
            {{ hint() }}
          </div>
        } @else {
          <div></div>
        }

        @if (maxlength()) {
          <span class="ui-char-count">
            {{ charCount() }}/{{ maxlength() }}
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

    .ui-textarea-field {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
      width: 100%;
    }

    .ui-textarea-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
    }

    .ui-textarea-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--ui-form-text, #111827);
      user-select: none;
    }

    .ui-textarea-required {
      color: var(--ui-form-error, #ef4444);
      margin-left: 0.125rem;
      font-weight: 600;
    }

    .ui-textarea-optional {
      font-size: 0.75rem;
      color: var(--ui-form-text-muted, #6b7280);
      font-weight: 400;
    }

    .ui-textarea-box {
      position: relative;
      width: 100%;
      background-color: var(--ui-form-bg, #ffffff);
      border: 1px solid var(--ui-form-border, #d1d5db);
      border-radius: var(--ui-form-radius, 8px);
      box-shadow: var(--ui-form-shadow-sm, 0 1px 2px rgba(0,0,0,0.05));
      transition: var(--ui-form-transition, all 0.15s ease);
      overflow: hidden;
    }

    .ui-textarea-box:hover:not(.is-disabled) {
      border-color: var(--ui-form-border-hover, #9ca3af);
    }

    .ui-textarea-box.is-focused {
      border-color: var(--ui-form-border-focus, #4f46e5);
      box-shadow: 0 0 0 3px var(--ui-form-primary-focus, rgba(79, 70, 229, 0.2));
    }

    .has-error .ui-textarea-box {
      border-color: var(--ui-form-error, #ef4444);
    }

    .has-error .ui-textarea-box.is-focused {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
    }

    .ui-native-textarea {
      width: 100%;
      border: none;
      background: transparent;
      padding: 0.625rem 0.875rem;
      font-size: 0.875rem;
      color: var(--ui-form-text, #111827);
      font-family: inherit;
      outline: none;
      line-height: 1.5;
      resize: vertical;
      min-height: 5rem;
      display: block;
      box-sizing: border-box;
    }

    .ui-native-textarea::placeholder {
      color: var(--ui-form-text-subtle, #9ca3af);
    }

    .ui-textarea-footer {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 0.5rem;
      min-height: 1.25rem;
      font-size: 0.775rem;
    }

    .ui-textarea-error {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      color: var(--ui-form-error-text, #b91c1c);
      font-weight: 500;
      animation: textareaSlideDown 0.15s ease-out;
    }

    .ui-error-icon {
      width: 0.875rem;
      height: 0.875rem;
      flex-shrink: 0;
      color: var(--ui-form-error, #ef4444);
    }

    .ui-textarea-hint {
      color: var(--ui-form-text-muted, #6b7280);
      line-height: 1.35;
    }

    .ui-char-count {
      color: var(--ui-form-text-subtle, #9ca3af);
      font-variant-numeric: tabular-nums;
      margin-left: auto;
      white-space: nowrap;
    }

    .is-disabled {
      opacity: 0.65;
      cursor: not-allowed;
    }

    .is-disabled .ui-textarea-box {
      background-color: var(--ui-form-surface-alt, #f3f4f6);
    }

    @keyframes textareaSlideDown {
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
export class UiTextareaComponent implements ControlValueAccessor, AfterViewInit {
  private errorService = inject(FormErrorService);
  private uid = `ui-textarea-${++nextTextareaId}`;

  readonly ngControl = inject(NgControl, { optional: true, self: true });

  @ViewChild('textareaEl') textareaEl?: ElementRef<HTMLTextAreaElement>;

  id = input<string>('');
  label = input<string>('');
  placeholder = input<string>('');
  hint = input<string>('');
  required = input(false, { transform: booleanAttribute });
  optional = input(false, { transform: booleanAttribute });
  readonly = input(false, { transform: booleanAttribute });
  disabled = input(false, { transform: booleanAttribute });
  rows = input<number>(4);
  maxlength = input<number | null>(null);
  autoResize = input(false, { transform: booleanAttribute });

  value = signal<string>('');
  isFocused = signal<boolean>(false);
  cvaDisabled = signal<boolean>(false);

  textareaId = computed(() => this.id() || this.uid);
  errorId = computed(() => `${this.textareaId()}-error`);
  hintId = computed(() => `${this.textareaId()}-hint`);

  charCount = computed(() => this.value()?.length || 0);
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

  ngAfterViewInit(): void {
    if (this.autoResize()) {
      this.adjustHeight();
    }
  }

  writeValue(val: any): void {
    this.value.set(val === null || val === undefined ? '' : String(val));
    if (this.autoResize()) {
      setTimeout(() => this.adjustHeight(), 0);
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

  handleInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    const val = target.value;
    this.value.set(val);
    this.onChange(val);
    if (this.autoResize()) {
      this.adjustHeight();
    }
  }

  handleFocus(): void {
    this.isFocused.set(true);
  }

  handleBlur(): void {
    this.isFocused.set(false);
    this.onTouched();
  }

  private adjustHeight(): void {
    if (!this.textareaEl) return;
    const el = this.textareaEl.nativeElement;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }
}
