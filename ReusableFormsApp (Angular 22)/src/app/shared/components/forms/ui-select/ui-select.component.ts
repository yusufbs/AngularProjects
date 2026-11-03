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
  templateUrl: './ui-select.component.html',
  styleUrl: './ui-select.component.css',
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
