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
  template: `
    <div class="ui-upload-field" [class.has-error]="isInvalid()" [class.is-disabled]="isDisabled()">
      @if (label()) {
        <div class="ui-upload-header">
          <span class="ui-upload-label">
            {{ label() }}
            @if (required()) {
              <span class="ui-upload-required" aria-hidden="true">*</span>
            }
          </span>
          @if (optional()) {
            <span class="ui-upload-optional">Optional</span>
          }
        </div>
      }

      <div
        class="ui-dropzone"
        [class.is-dragover]="isDragOver()"
        (dragover)="handleDragOver($event)"
        (dragleave)="handleDragLeave($event)"
        (drop)="handleDrop($event)"
        (click)="triggerFileInput()"
        role="button"
        tabindex="0"
        (keydown.enter)="triggerFileInput()"
        (keydown.space)="triggerFileInput()"
      >
        <input
          #fileInput
          type="file"
          [id]="uploadId()"
          [accept]="accept()"
          [multiple]="multiple()"
          [disabled]="isDisabled()"
          (change)="handleFileSelect($event)"
          class="ui-hidden-file-input"
        />

        <div class="ui-dropzone-content">
          <div class="ui-upload-icon-circle">
            <svg class="ui-upload-cloud-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <div class="ui-dropzone-text">
            <span class="ui-dropzone-primary">Click to upload</span> or drag and drop
          </div>
          <div class="ui-dropzone-hint">
            {{ accept() !== '*' ? accept() : 'Any file' }} up to {{ formattedMaxSize() }}
          </div>
        </div>
      </div>

      <!-- Selected Files List -->
      @if (files().length > 0) {
        <div class="ui-files-list">
          @for (f of files(); track f.name; let idx = $index) {
            <div class="ui-file-chip">
              <svg class="ui-file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <div class="ui-file-info">
                <span class="ui-file-name" [title]="f.name">{{ f.name }}</span>
                <span class="ui-file-size">{{ formatBytes(f.size) }}</span>
              </div>
              @if (!isDisabled()) {
                <button
                  type="button"
                  class="ui-file-remove-btn"
                  (click)="removeFile(idx, $event)"
                  aria-label="Remove file"
                >
                  &times;
                </button>
              }
            </div>
          }
        </div>
      }

      <div class="ui-upload-footer">
        @if (isInvalid() && errorMessage()) {
          <div [id]="errorId()" class="ui-upload-error" role="alert">
            <svg class="ui-error-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <span>{{ errorMessage() }}</span>
          </div>
        } @else if (hint()) {
          <div [id]="hintId()" class="ui-upload-hint">{{ hint() }}</div>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .ui-upload-field {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
    }

    .ui-upload-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
    }

    .ui-upload-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--ui-form-text, #111827);
    }

    .ui-upload-required {
      color: var(--ui-form-error, #ef4444);
      margin-left: 0.125rem;
      font-weight: 600;
    }

    .ui-upload-optional {
      font-size: 0.75rem;
      color: var(--ui-form-text-muted, #6b7280);
    }

    .ui-dropzone {
      border: 2px dashed var(--ui-form-border, #d1d5db);
      border-radius: var(--ui-form-radius, 8px);
      padding: 1.5rem 1rem;
      text-align: center;
      background-color: var(--ui-form-bg, #ffffff);
      cursor: pointer;
      transition: var(--ui-form-transition, all 0.15s ease);
      user-select: none;
    }

    .ui-dropzone:hover:not(.is-disabled) {
      border-color: var(--ui-form-primary, #4f46e5);
      background-color: var(--ui-form-primary-focus, rgba(79, 70, 229, 0.02));
    }

    .ui-dropzone.is-dragover {
      border-color: var(--ui-form-primary, #4f46e5);
      background-color: var(--ui-form-primary-focus, rgba(79, 70, 229, 0.08));
    }

    .has-error .ui-dropzone {
      border-color: var(--ui-form-error, #ef4444);
    }

    .ui-hidden-file-input {
      display: none;
    }

    .ui-dropzone-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .ui-upload-icon-circle {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      background-color: var(--ui-form-surface-alt, #f3f4f6);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--ui-form-primary, #4f46e5);
    }

    .ui-upload-cloud-icon {
      width: 1.25rem;
      height: 1.25rem;
    }

    .ui-dropzone-text {
      font-size: 0.875rem;
      color: var(--ui-form-text, #374151);
    }

    .ui-dropzone-primary {
      color: var(--ui-form-primary, #4f46e5);
      font-weight: 500;
    }

    .ui-dropzone-hint {
      font-size: 0.75rem;
      color: var(--ui-form-text-muted, #6b7280);
    }

    .ui-files-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-top: 0.25rem;
    }

    .ui-file-chip {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem 0.75rem;
      background-color: var(--ui-form-surface, #f9fafb);
      border: 1px solid var(--ui-form-border, #e5e7eb);
      border-radius: var(--ui-form-radius-sm, 6px);
    }

    .ui-file-icon {
      width: 1.25rem;
      height: 1.25rem;
      color: var(--ui-form-primary, #4f46e5);
      flex-shrink: 0;
    }

    .ui-file-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .ui-file-name {
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--ui-form-text, #111827);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .ui-file-size {
      font-size: 0.75rem;
      color: var(--ui-form-text-muted, #6b7280);
    }

    .ui-file-remove-btn {
      background: none;
      border: none;
      font-size: 1.25rem;
      line-height: 1;
      color: var(--ui-form-text-muted, #9ca3af);
      cursor: pointer;
      padding: 0 0.25rem;
    }

    .ui-file-remove-btn:hover {
      color: var(--ui-form-error, #ef4444);
    }

    .ui-upload-footer {
      display: flex;
      align-items: flex-start;
      min-height: 1.25rem;
      font-size: 0.775rem;
    }

    .ui-upload-error {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      color: var(--ui-form-error-text, #b91c1c);
      font-weight: 500;
    }

    .ui-error-icon {
      width: 0.875rem;
      height: 0.875rem;
      color: var(--ui-form-error, #ef4444);
    }

    .ui-upload-hint {
      color: var(--ui-form-text-muted, #6b7280);
    }

    .is-disabled {
      opacity: 0.65;
      cursor: not-allowed;
    }
  `],
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
