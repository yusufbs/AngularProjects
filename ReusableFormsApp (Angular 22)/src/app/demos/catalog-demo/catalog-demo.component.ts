import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  UiFormFieldComponent,
  UiInputComponent,
  UiTextareaComponent,
  UiSelectComponent,
  UiCheckboxComponent,
  UiCheckboxGroupComponent,
  UiRadioGroupComponent,
  UiSwitchComponent,
  UiDatepickerComponent,
  UiFileUploadComponent,
  UiSelectOption,
  UiRadioOption,
  UiCheckboxOption,
} from '../../shared/components/forms';

@Component({
  selector: 'app-catalog-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UiFormFieldComponent,
    UiInputComponent,
    UiTextareaComponent,
    UiSelectComponent,
    UiCheckboxComponent,
    UiCheckboxGroupComponent,
    UiRadioGroupComponent,
    UiSwitchComponent,
    UiDatepickerComponent,
    UiFileUploadComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="catalog-container">
      <div class="catalog-header">
        <h2 class="catalog-title">Component Catalog & Interactive Gallery</h2>
        <p class="catalog-subtitle">
          Test each isolated form element, inspect its two-way signal/model state, and copy drop-in snippets for your Angular projects.
        </p>
      </div>

      <div class="catalog-grid">
        <!-- 1. Text & Password Input -->
        <div class="catalog-card">
          <div class="card-top">
            <span class="badge">Input</span>
            <h3 class="component-name">&lt;ui-input&gt;</h3>
          </div>
          <p class="component-desc">Text, email, search, password with reveal toggle, and clearable inputs.</p>
          <div class="component-stage">
            <ui-input
              label="Standard Text Input"
              placeholder="Type something..."
              [clearable]="true"
              prefixIcon="🔍"
              hint="Includes one-click clear button"
              [(ngModel)]="sampleText"
            />
            <ui-input
              type="password"
              label="Password with Reveal"
              placeholder="••••••••"
              hint="Click eye icon to toggle visibility"
              prefixIcon="🔑"
              [(ngModel)]="samplePassword"
            />
          </div>
          <div class="stage-footer">
            <span class="val-preview">Value: "{{ sampleText() }}"</span>
          </div>
        </div>

        <!-- 2. Textarea -->
        <div class="catalog-card">
          <div class="card-top">
            <span class="badge">Textarea</span>
            <h3 class="component-name">&lt;ui-textarea&gt;</h3>
          </div>
          <p class="component-desc">Auto-resizing multi-line text input with character counter and max length.</p>
          <div class="component-stage">
            <ui-textarea
              label="Feedback & Notes"
              placeholder="Start typing multiple lines to watch it expand automatically..."
              [rows]="3"
              [maxlength]="150"
              [autoResize]="true"
              hint="Dynamically adjusts height to content"
              [(ngModel)]="sampleTextarea"
            />
          </div>
          <div class="stage-footer">
            <span class="val-preview">Length: {{ sampleTextarea().length }}/150 chars</span>
          </div>
        </div>

        <!-- 3. Select Dropdown -->
        <div class="catalog-card">
          <div class="card-top">
            <span class="badge">Dropdown</span>
            <h3 class="component-name">&lt;ui-select&gt;</h3>
          </div>
          <p class="component-desc">Custom accessible select with live search filter, options, and keyboard support.</p>
          <div class="component-stage">
            <ui-select
              label="Frontend Framework"
              placeholder="Choose a framework..."
              [options]="frameworkOptions"
              [searchable]="true"
              [clearable]="true"
              hint="Type to filter options or use arrow keys"
              [(ngModel)]="sampleSelect"
            />
          </div>
          <div class="stage-footer">
            <span class="val-preview">Selected: {{ sampleSelect() || 'null' }}</span>
          </div>
        </div>

        <!-- 4. Switch Toggle -->
        <div class="catalog-card">
          <div class="card-top">
            <span class="badge">Switch</span>
            <h3 class="component-name">&lt;ui-switch&gt;</h3>
          </div>
          <p class="component-desc">WCAG AA accessible switch toggle with smooth sliding animation.</p>
          <div class="component-stage">
            <ui-switch
              label="Push Notifications"
              description="Receive instant alerts for build deployments"
              [(ngModel)]="sampleSwitch"
            />
            <ui-switch
              label="Autonomous Error Tracking"
              description="Label aligned to the left side"
              labelPosition="left"
              [(ngModel)]="sampleSwitch2"
            />
          </div>
          <div class="stage-footer">
            <span class="val-preview">State: {{ sampleSwitch() ? 'Active' : 'Inactive' }}</span>
          </div>
        </div>

        <!-- 5. Checkbox & Indeterminate -->
        <div class="catalog-card">
          <div class="card-top">
            <span class="badge">Checkbox</span>
            <h3 class="component-name">&lt;ui-checkbox&gt;</h3>
          </div>
          <p class="component-desc">Single checkbox supporting indeterminate tri-state and rich description slots.</p>
          <div class="component-stage">
            <ui-checkbox
              label="Agree to Developer Terms"
              description="Must be checked before publishing modules"
              [(ngModel)]="sampleCheckbox"
            />
            <ui-checkbox
              label="Indeterminate Tri-State"
              description="Used for parent/child select all hierarchies"
              [indeterminate]="true"
            />
          </div>
          <div class="stage-footer">
            <span class="val-preview">Checked: {{ sampleCheckbox() }}</span>
          </div>
        </div>

        <!-- 6. Checkbox Group -->
        <div class="catalog-card">
          <div class="card-top">
            <span class="badge">Checkbox Group</span>
            <h3 class="component-name">&lt;ui-checkbox-group&gt;</h3>
          </div>
          <p class="component-desc">Group of checkboxes bound directly to an array of values.</p>
          <div class="component-stage">
            <ui-checkbox-group
              label="Target Deployment Clouds"
              hint="Select multiple infrastructure targets"
              [options]="cloudOptions"
              orientation="horizontal"
              [(ngModel)]="sampleCheckboxGroup"
            />
          </div>
          <div class="stage-footer">
            <span class="val-preview">Selected: [{{ sampleCheckboxGroup().join(', ') }}]</span>
          </div>
        </div>

        <!-- 7. Radio Group -->
        <div class="catalog-card">
          <div class="card-top">
            <span class="badge">Radio</span>
            <h3 class="component-name">&lt;ui-radio-group&gt;</h3>
          </div>
          <p class="component-desc">Single choice selector with standard circular radios or card style.</p>
          <div class="component-stage">
            <ui-radio-group
              label="Compute Instance Type"
              [options]="computeOptions"
              cardStyle
              [(ngModel)]="sampleRadio"
            />
          </div>
          <div class="stage-footer">
            <span class="val-preview">Tier: {{ sampleRadio() }}</span>
          </div>
        </div>

        <!-- 8. Datepicker -->
        <div class="catalog-card">
          <div class="card-top">
            <span class="badge">Datepicker</span>
            <h3 class="component-name">&lt;ui-datepicker&gt;</h3>
          </div>
          <p class="component-desc">Standard date input with one-click quick preset chips.</p>
          <div class="component-stage">
            <ui-datepicker
              label="Release Deadline"
              hint="Use quick presets below for instant offset calculation"
              quickPresets
              [(ngModel)]="sampleDate"
            />
          </div>
          <div class="stage-footer">
            <span class="val-preview">Date: {{ sampleDate() || 'Not set' }}</span>
          </div>
        </div>

        <!-- 10. Form Field Structural Wrapper -->
        <div class="catalog-card">
          <div class="card-top">
            <span class="badge">Layout Wrapper</span>
            <h3 class="component-name">&lt;ui-form-field&gt;</h3>
          </div>
          <p class="component-desc">Structural wrapper for custom controls with prefixes, suffixes, and hints.</p>
          <div class="component-stage">
            <ui-form-field
              label="Custom Token Input"
              hint="Wrapped with prefix and suffix badges"
              required
            >
              <span prefix style="padding: 0 0.5rem; color: #6366f1; font-weight: 600;">TOKEN:</span>
              <input
                type="text"
                placeholder="Enter alphanumeric token"
                style="width: 100%; border: 1px solid #d1d5db; padding: 0.5rem; border-radius: 6px;"
              />
              <span suffix style="padding: 0 0.5rem; color: #10b981; font-weight: 600;">✓ Active</span>
            </ui-form-field>
          </div>
        </div>

        <!-- 9. File Upload -->
        <div class="catalog-card" style="grid-column: 1 / -1;">
          <div class="card-top">
            <span class="badge">Upload</span>
            <h3 class="component-name">&lt;ui-file-upload&gt;</h3>
          </div>
          <p class="component-desc">Drag and drop file upload with file type filter, size limits, and removable preview chips.</p>
          <div class="component-stage">
            <ui-file-upload
              label="Project Assets & Documentation"
              hint="Accepts images and PDF files up to 15MB"
              accept="image/*,.pdf"
              [multiple]="true"
              [(ngModel)]="sampleFiles"
            />
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .catalog-container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .catalog-header {
      background: var(--ui-form-bg, #ffffff);
      border: 1px solid var(--ui-form-border, #e5e7eb);
      border-radius: var(--ui-form-radius-lg, 12px);
      padding: 1.5rem 1.75rem;
    }

    .catalog-title {
      margin: 0;
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--ui-form-text, #111827);
    }

    .catalog-subtitle {
      margin: 0.35rem 0 0 0;
      font-size: 0.9rem;
      color: var(--ui-form-text-muted, #6b7280);
    }

    .catalog-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 1.5rem;
    }

    .catalog-card {
      background: var(--ui-form-bg, #ffffff);
      border: 1px solid var(--ui-form-border, #e5e7eb);
      border-radius: var(--ui-form-radius-lg, 12px);
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      box-shadow: var(--ui-form-shadow-sm, 0 1px 3px rgba(0,0,0,0.05));
    }

    .card-top {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.25rem;
    }

    .badge {
      font-size: 0.675rem;
      font-weight: 700;
      text-transform: uppercase;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      background: var(--ui-form-primary-focus, rgba(79, 70, 229, 0.1));
      color: var(--ui-form-primary, #4f46e5);
    }

    .component-name {
      margin: 0;
      font-family: var(--font-mono, monospace);
      font-size: 1.05rem;
      color: var(--ui-form-text, #111827);
    }

    .component-desc {
      margin: 0.25rem 0 1.25rem 0;
      font-size: 0.8125rem;
      color: var(--ui-form-text-muted, #6b7280);
      line-height: 1.4;
    }

    .component-stage {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      background: var(--ui-form-surface, #f9fafb);
      border: 1px solid var(--ui-form-border, #f3f4f6);
      border-radius: var(--ui-form-radius, 8px);
      flex: 1;
    }

    .stage-footer {
      margin-top: 0.75rem;
      padding-top: 0.75rem;
      border-top: 1px solid var(--ui-form-border, #f3f4f6);
    }

    .val-preview {
      font-family: var(--font-mono, monospace);
      font-size: 0.75rem;
      color: var(--ui-form-primary, #4f46e5);
      font-weight: 500;
    }
  `],
})
export class CatalogDemoComponent {
  sampleText = signal<string>('Hello Angular 22!');
  samplePassword = signal<string>('SecretP@ssw0rd!');
  sampleTextarea = signal<string>('This textarea automatically grows as you type more lines without breaking your layout!');
  sampleSelect = signal<string>('angular');
  sampleSwitch = signal<boolean>(true);
  sampleSwitch2 = signal<boolean>(false);
  sampleCheckbox = signal<boolean>(true);
  sampleCheckboxGroup = signal<string[]>(['aws', 'gcp']);
  sampleRadio = signal<string>('standard');
  sampleDate = signal<string>('2026-12-01');
  sampleFiles = signal<any[]>([]);

  frameworkOptions: UiSelectOption[] = [
    { label: 'Angular 22+ (Signals & Modern Control Flow)', value: 'angular' },
    { label: 'React 19', value: 'react' },
    { label: 'Vue 3.5', value: 'vue' },
    { label: 'Svelte 5', value: 'svelte' },
    { label: 'Solid.js', value: 'solid' },
  ];

  cloudOptions: UiCheckboxOption[] = [
    { label: 'Amazon Web Services (AWS)', value: 'aws' },
    { label: 'Google Cloud Platform (GCP)', value: 'gcp' },
    { label: 'Microsoft Azure', value: 'azure' },
    { label: 'Cloudflare Workers', value: 'cloudflare' },
  ];

  computeOptions: UiRadioOption[] = [
    {
      label: 'Shared Burstable',
      value: 'burstable',
      description: '2 vCPU / 4GB RAM. Low cost development instance.',
    },
    {
      label: 'Standard Dedicated',
      value: 'standard',
      description: '4 vCPU / 16GB RAM. Production API & worker workloads.',
    },
    {
      label: 'High Memory Compute',
      value: 'highmem',
      description: '16 vCPU / 64GB RAM. Machine learning & in-memory caches.',
    },
  ];
}
