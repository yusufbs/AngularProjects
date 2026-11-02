import {
  Component,
  ChangeDetectionStrategy,
  input,
  signal,
  computed,
  inject,
  ElementRef,
  HostListener,
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
import { UiSelectOption } from '../models/form.models';

let nextSelectId = 0;

@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ui-select-field" [class.has-error]="isInvalid()" [class.is-disabled]="isDisabled()">
      @if (label()) {
        <div class="ui-select-header">
          <label [for]="selectId()" class="ui-select-label">
            {{ label() }}
            @if (required()) {
              <span class="ui-select-required" aria-hidden="true">*</span>
            }
          </label>
          @if (optional()) {
            <span class="ui-select-optional">Optional</span>
          }
        </div>
      }

      <div class="ui-select-container">
        <!-- Trigger Button -->
        <button
          type="button"
          [id]="selectId()"
          class="ui-select-trigger"
          [class.is-open]="isOpen()"
          [class.has-value]="hasSelectedValue()"
          [disabled]="isDisabled()"
          (click)="toggleOpen()"
          (keydown)="handleTriggerKeydown($event)"
          [attr.aria-expanded]="isOpen()"
          [attr.aria-haspopup]="'listbox'"
          [attr.aria-describedby]="describedBy()"
        >
          <span class="ui-select-value-text">
            @if (selectedOption()) {
              {{ selectedOption()?.label }}
            } @else {
              <span class="ui-select-placeholder">{{ placeholder() }}</span>
            }
          </span>

          <div class="ui-select-affixes">
            @if (clearable() && hasSelectedValue() && !isDisabled()) {
              <span
                class="ui-select-clear"
                (click)="clearSelection($event)"
                aria-label="Clear selection"
              >
                &times;
              </span>
            }
            <svg class="ui-select-arrow" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
        </button>

        <!-- Dropdown Popover -->
        @if (isOpen()) {
          <div class="ui-select-dropdown" role="listbox">
            @if (searchable()) {
              <div class="ui-select-search-wrap">
                <input
                  type="text"
                  class="ui-select-search-input"
                  placeholder="Search options..."
                  [value]="searchQuery()"
                  (input)="handleSearchInput($event)"
                  (click)="$event.stopPropagation()"
                />
              </div>
            }

            <div class="ui-select-options-list">
              @if (filteredOptions().length === 0) {
                <div class="ui-select-empty">No options found.</div>
              } @else {
                @for (opt of filteredOptions(); track opt.value; let idx = $index) {
                  <div
                    class="ui-select-option"
                    [class.is-selected]="isSelected(opt.value)"
                    [class.is-disabled]="opt.disabled"
                    [class.is-highlighted]="highlightedIndex() === idx"
                    (click)="selectOption(opt, $event)"
                    (mouseenter)="highlightedIndex.set(idx)"
                    role="option"
                    [attr.aria-selected]="isSelected(opt.value)"
                  >
                    <span>{{ opt.label }}</span>
                    @if (isSelected(opt.value)) {
                      <svg class="ui-select-check" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    }
                  </div>
                }
              }
            </div>
          </div>
        }
      </div>

      <div class="ui-select-footer">
        @if (isInvalid() && errorMessage()) {
          <div [id]="errorId()" class="ui-select-error" role="alert">
            <svg class="ui-error-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <span>{{ errorMessage() }}</span>
          </div>
        } @else if (hint()) {
          <div [id]="hintId()" class="ui-select-hint">
            {{ hint() }}
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .ui-select-field {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
      width: 100%;
    }

    .ui-select-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
    }

    .ui-select-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--ui-form-text, #111827);
      user-select: none;
    }

    .ui-select-required {
      color: var(--ui-form-error, #ef4444);
      margin-left: 0.125rem;
      font-weight: 600;
    }

    .ui-select-optional {
      font-size: 0.75rem;
      color: var(--ui-form-text-muted, #6b7280);
      font-weight: 400;
    }

    .ui-select-container {
      position: relative;
      width: 100%;
    }

    .ui-select-trigger {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      padding: 0.625rem 0.875rem;
      background-color: var(--ui-form-bg, #ffffff);
      border: 1px solid var(--ui-form-border, #d1d5db);
      border-radius: var(--ui-form-radius, 8px);
      box-shadow: var(--ui-form-shadow-sm, 0 1px 2px rgba(0,0,0,0.05));
      cursor: pointer;
      text-align: left;
      font-family: inherit;
      font-size: 0.875rem;
      color: var(--ui-form-text, #111827);
      transition: var(--ui-form-transition, all 0.15s ease);
    }

    .ui-select-trigger:hover:not(:disabled) {
      border-color: var(--ui-form-border-hover, #9ca3af);
    }

    .ui-select-trigger.is-open {
      border-color: var(--ui-form-border-focus, #4f46e5);
      box-shadow: 0 0 0 3px var(--ui-form-primary-focus, rgba(79, 70, 229, 0.2));
    }

    .has-error .ui-select-trigger {
      border-color: var(--ui-form-error, #ef4444);
    }

    .ui-select-value-text {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .ui-select-placeholder {
      color: var(--ui-form-text-subtle, #9ca3af);
    }

    .ui-select-affixes {
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }

    .ui-select-clear {
      font-size: 1.125rem;
      line-height: 1;
      color: var(--ui-form-text-muted, #6b7280);
      cursor: pointer;
      padding: 0 0.25rem;
    }

    .ui-select-clear:hover {
      color: var(--ui-form-text, #111827);
    }

    .ui-select-arrow {
      width: 1.125rem;
      height: 1.125rem;
      color: var(--ui-form-text-muted, #6b7280);
      transition: transform 0.15s ease;
    }

    .is-open .ui-select-arrow {
      transform: rotate(180deg);
    }

    .ui-select-dropdown {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
      z-index: 50;
      background-color: var(--ui-form-bg, #ffffff);
      border: 1px solid var(--ui-form-border, #d1d5db);
      border-radius: var(--ui-form-radius, 8px);
      box-shadow: var(--ui-form-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
      max-height: 15rem;
      display: flex;
      flex-direction: column;
      animation: selectFadeIn 0.12s ease-out;
      overflow: hidden;
    }

    .ui-select-search-wrap {
      padding: 0.5rem;
      border-bottom: 1px solid var(--ui-form-border, #e5e7eb);
    }

    .ui-select-search-input {
      width: 100%;
      border: 1px solid var(--ui-form-border, #d1d5db);
      border-radius: var(--ui-form-radius-sm, 6px);
      padding: 0.375rem 0.5rem;
      font-size: 0.8125rem;
      outline: none;
      font-family: inherit;
    }

    .ui-select-search-input:focus {
      border-color: var(--ui-form-border-focus, #4f46e5);
    }

    .ui-select-options-list {
      overflow-y: auto;
      max-height: 12rem;
      padding: 0.25rem;
    }

    .ui-select-option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 0.75rem;
      border-radius: var(--ui-form-radius-sm, 6px);
      font-size: 0.875rem;
      color: var(--ui-form-text, #111827);
      cursor: pointer;
      user-select: none;
      transition: background-color 0.1s ease;
    }

    .ui-select-option:hover,
    .ui-select-option.is-highlighted {
      background-color: var(--ui-form-surface-alt, #f3f4f6);
    }

    .ui-select-option.is-selected {
      background-color: var(--ui-form-primary-focus, rgba(79, 70, 229, 0.1));
      color: var(--ui-form-primary, #4f46e5);
      font-weight: 500;
    }

    .ui-select-option.is-disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .ui-select-check {
      width: 1rem;
      height: 1rem;
      color: var(--ui-form-primary, #4f46e5);
    }

    .ui-select-empty {
      padding: 0.75rem;
      text-align: center;
      font-size: 0.8125rem;
      color: var(--ui-form-text-muted, #6b7280);
    }

    .ui-select-footer {
      display: flex;
      align-items: flex-start;
      min-height: 1.25rem;
      font-size: 0.775rem;
    }

    .ui-select-error {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      color: var(--ui-form-error-text, #b91c1c);
      font-weight: 500;
    }

    .ui-error-icon {
      width: 0.875rem;
      height: 0.875rem;
      flex-shrink: 0;
      color: var(--ui-form-error, #ef4444);
    }

    .ui-select-hint {
      color: var(--ui-form-text-muted, #6b7280);
    }

    .is-disabled {
      opacity: 0.65;
      cursor: not-allowed;
    }

    @keyframes selectFadeIn {
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
export class UiSelectComponent implements ControlValueAccessor {
  private errorService = inject(FormErrorService);
  private elementRef = inject(ElementRef);
  private uid = `ui-select-${++nextSelectId}`;

  readonly ngControl = inject(NgControl, { optional: true, self: true });

  id = input<string>('');
  label = input<string>('');
  placeholder = input<string>('Select an option...');
  hint = input<string>('');
  required = input(false, { transform: booleanAttribute });
  optional = input(false, { transform: booleanAttribute });
  disabled = input(false, { transform: booleanAttribute });
  options = input<UiSelectOption[]>([]);
  searchable = input(false, { transform: booleanAttribute });
  clearable = input(false, { transform: booleanAttribute });

  value = signal<any>(null);
  isOpen = signal<boolean>(false);
  searchQuery = signal<string>('');
  highlightedIndex = signal<number>(-1);
  cvaDisabled = signal<boolean>(false);

  selectId = computed(() => this.id() || this.uid);
  errorId = computed(() => `${this.selectId()}-error`);
  hintId = computed(() => `${this.selectId()}-hint`);

  isDisabled = computed(() => this.disabled() || this.cvaDisabled());

  filteredOptions = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.options();
    return this.options().filter((opt) =>
      opt.label.toLowerCase().includes(query)
    );
  });

  selectedOption = computed(() => {
    const val = this.value();
    if (val === null || val === undefined || val === '') return null;
    return this.options().find((opt) => opt.value === val) || null;
  });

  hasSelectedValue = computed(() => this.selectedOption() !== null);

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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      if (this.isOpen()) {
        this.close();
      }
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

  toggleOpen(): void {
    if (this.isDisabled()) return;
    if (this.isOpen()) {
      this.close();
    } else {
      this.isOpen.set(true);
      this.searchQuery.set('');
    }
  }

  close(): void {
    this.isOpen.set(false);
    this.searchQuery.set('');
    this.highlightedIndex.set(-1);
    this.onTouched();
  }

  selectOption(opt: UiSelectOption, event?: Event): void {
    if (event) event.stopPropagation();
    if (opt.disabled) return;
    this.value.set(opt.value);
    this.onChange(opt.value);
    this.close();
  }

  clearSelection(event: Event): void {
    event.stopPropagation();
    this.value.set(null);
    this.onChange(null);
  }

  isSelected(optVal: any): boolean {
    return this.value() === optVal;
  }

  handleSearchInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.searchQuery.set(val);
    this.highlightedIndex.set(0);
  }

  handleTriggerKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!this.isOpen()) {
        this.toggleOpen();
      } else {
        this.highlightedIndex.update((i) =>
          Math.min(i + 1, this.filteredOptions().length - 1)
        );
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (this.isOpen()) {
        this.highlightedIndex.update((i) => Math.max(i - 1, 0));
      }
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (this.isOpen()) {
        const idx = this.highlightedIndex();
        const opts = this.filteredOptions();
        if (idx >= 0 && idx < opts.length) {
          this.selectOption(opts[idx]);
        }
      } else {
        this.toggleOpen();
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
    }
  }
}
