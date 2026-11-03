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
  templateUrl: './ui-textarea.component.html',
  styleUrl: './ui-textarea.component.css',
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
  maxlength = input<number | string | null | undefined>(null);
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
