import {
  Component,
  ChangeDetectionStrategy,
  input,
  signal,
  computed,
  inject,
  ElementRef,
  ViewChild,
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

let nextUploadId = 0;

@Component({
  selector: 'ui-file-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ui-file-upload.component.html',
  styleUrl: './ui-file-upload.component.css',
})
export class UiFileUploadComponent implements ControlValueAccessor {
  private errorService = inject(FormErrorService);
  private uid = `ui-upload-${++nextUploadId}`;

  readonly ngControl = inject(NgControl, { optional: true, self: true });

  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;

  id = input<string>('');
  label = input<string>('');
  hint = input<string>('');
  accept = input<string>('*');
  multiple = input(false, { transform: booleanAttribute });
  maxSizeBytes = input<number>(10 * 1024 * 1024); // 10MB
  required = input(false, { transform: booleanAttribute });
  optional = input(false, { transform: booleanAttribute });
  disabled = input(false, { transform: booleanAttribute });

  files = signal<File[]>([]);
  isDragOver = signal<boolean>(false);
  cvaDisabled = signal<boolean>(false);

  uploadId = computed(() => this.id() || this.uid);
  errorId = computed(() => `${this.uploadId()}-error`);
  hintId = computed(() => `${this.uploadId()}-hint`);

  isDisabled = computed(() => this.disabled() || this.cvaDisabled());
  formattedMaxSize = computed(() => this.formatBytes(this.maxSizeBytes()));

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
    if (Array.isArray(val)) {
      this.files.set(val);
    } else if (val instanceof File) {
      this.files.set([val]);
    } else {
      this.files.set([]);
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

  triggerFileInput(): void {
    if (this.isDisabled()) return;
    this.fileInput?.nativeElement.click();
  }

  handleFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(Array.from(input.files));
    }
    input.value = '';
  }

  handleDragOver(event: DragEvent): void {
    event.preventDefault();
    if (this.isDisabled()) return;
    this.isDragOver.set(true);
  }

  handleDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver.set(false);
  }

  handleDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver.set(false);
    if (this.isDisabled()) return;
    if (event.dataTransfer?.files) {
      this.addFiles(Array.from(event.dataTransfer.files));
    }
  }

  private addFiles(newFiles: File[]): void {
    let updated: File[];
    if (this.multiple()) {
      updated = [...this.files(), ...newFiles];
    } else {
      updated = newFiles.slice(0, 1);
    }
    this.files.set(updated);
    this.emitValue(updated);
  }

  removeFile(index: number, event: Event): void {
    event.stopPropagation();
    const updated = [...this.files()];
    updated.splice(index, 1);
    this.files.set(updated);
    this.emitValue(updated);
  }

  private emitValue(files: File[]): void {
    const output = this.multiple() ? files : files[0] || null;
    this.onChange(output);
    this.onTouched();
  }

  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }
}
