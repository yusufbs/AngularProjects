import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiDynamicFormComponent } from '../../shared/components/forms/ui-dynamic-form/ui-dynamic-form.component';
import { DynamicFormSchema } from '../../shared/components/forms/models/form.models';

const INITIAL_SCHEMA: DynamicFormSchema = {
  title: 'Consulting Project Estimator',
  description: 'Schema-driven form with dynamic field generation and conditional dependency rules.',
  submitText: 'Generate Quote',
  showReset: true,
  resetText: 'Reset Form',
  layout: 'grid-2',
  fields: [
    {
      name: 'clientName',
      type: 'text',
      label: 'Client Organization',
      placeholder: 'Acme Global Corp',
      hint: 'Entity name for licensing',
      validators: { required: true, minLength: 3 },
      clearable: true,
      gridCols: 1,
    },
    {
      name: 'contactEmail',
      type: 'email',
      label: 'Billing Contact Email',
      placeholder: 'finance@acme.com',
      validators: { required: true, email: true },
      clearable: true,
      gridCols: 1,
    },
    {
      name: 'engagementType',
      type: 'select',
      label: 'Engagement Model',
      placeholder: 'Choose engagement model...',
      defaultValue: 'fixed-scope',
      options: [
        { label: 'Fixed Scope Project', value: 'fixed-scope' },
        { label: 'Time & Materials / Contractor', value: 'time-materials' },
        { label: 'Retainer / Advisory', value: 'retainer' },
      ],
      validators: { required: true },
      gridCols: 2,
    },
    {
      name: 'hourlyRate',
      type: 'number',
      label: 'Agreed Hourly Rate (USD)',
      placeholder: '220',
      hint: 'Only appears when Engagement Model is "Time & Materials"',
      defaultValue: 200,
      validators: { required: true, min: 100, max: 1000 },
      gridCols: 1,
      dependsOn: {
        field: 'engagementType',
        value: 'time-materials',
      },
    },
    {
      name: 'weeklyCapHours',
      type: 'number',
      label: 'Weekly Hours Cap',
      placeholder: '40',
      defaultValue: 40,
      validators: { required: true, min: 5, max: 80 },
      gridCols: 1,
      dependsOn: {
        field: 'engagementType',
        value: 'time-materials',
      },
    },
    {
      name: 'startDate',
      type: 'date',
      label: 'Target Kickoff Date',
      validators: { required: true },
      gridCols: 1,
    },
    {
      name: 'confidentialityNda',
      type: 'switch',
      label: 'Mutual NDA Signed & On File',
      hint: 'Check if NDA has executed before milestone start',
      defaultValue: true,
      gridCols: 1,
    },
    {
      name: 'projectSummary',
      type: 'textarea',
      label: 'High-Level Architecture Deliverables',
      placeholder: 'Specify key milestones, deliverables, and service level agreements...',
      rows: 4,
      validators: { required: true, minLength: 10 },
      gridCols: 2,
    },
  ],
};

@Component({
  selector: 'app-dynamic-form-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, UiDynamicFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="demo-grid">
      <!-- Schema Editor Column -->
      <div class="demo-card editor-panel">
        <div class="demo-card-header">
          <div class="editor-header-bar">
            <h2 class="card-title">Dynamic JSON Schema</h2>
            <button type="button" class="reset-schema-btn" (click)="resetSchema()">
              Reset Schema
            </button>
          </div>
          <p class="card-subtitle">
            Edit the schema JSON below in real time. Notice how the form instantly updates its components, validators, and <code>dependsOn</code> visibility!
          </p>
        </div>

        <div class="editor-container">
          <textarea
            class="schema-textarea"
            [ngModel]="schemaJsonString()"
            (ngModelChange)="onSchemaTextChange($event)"
            spellcheck="false"
          ></textarea>
        </div>

        @if (schemaParseError()) {
          <div class="error-banner">
            <strong>JSON Error:</strong> {{ schemaParseError() }}
          </div>
        }
      </div>

      <!-- Generated Form Column -->
      <div class="demo-card renderer-panel">
        <div class="demo-card-header">
          <div class="renderer-title-wrap">
            <h3 class="card-title">Live Generated UI Form</h3>
            <span class="active-pill">? Signal Forms Engine</span>
          </div>
          <p class="card-subtitle">
            Rendered automatically by <code>&lt;ui-dynamic-form&gt;</code> without writing any manual HTML templates!
          </p>
        </div>

        @if (currentSchema()) {
          <ui-dynamic-form
            [schema]="currentSchema()!"
            (formSubmit)="onFormSubmit($event)"
            (formReset)="onFormReset()"
          />
        }

        @if (submittedOutput()) {
          <div class="submission-card">
            <div class="submission-title">Emitted Valid Schema Submission:</div>
            <pre class="submission-code"><code>{{ submittedOutput() | json }}</code></pre>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .demo-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.3fr);
      gap: 1.5rem;
      align-items: start;
    }

    @media (max-width: 1024px) {
      .demo-grid {
        grid-template-columns: 1fr;
      }
    }

    .demo-card {
      background: var(--ui-form-bg, #ffffff);
      border: 1px solid var(--ui-form-border, #e5e7eb);
      border-radius: var(--ui-form-radius-lg, 12px);
      padding: 1.75rem;
      box-shadow: var(--ui-form-shadow-sm, 0 1px 3px rgba(0,0,0,0.05));
    }

    .demo-card-header {
      margin-bottom: 1.5rem;
      border-bottom: 1px solid var(--ui-form-border, #f3f4f6);
      padding-bottom: 1rem;
    }

    .editor-header-bar,
    .renderer-title-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .card-title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--ui-form-text, #111827);
    }

    .card-subtitle {
      margin: 0.35rem 0 0 0;
      font-size: 0.875rem;
      color: var(--ui-form-text-muted, #6b7280);
      line-height: 1.4;
    }

    .reset-schema-btn {
      background: var(--ui-form-surface-alt, #f3f4f6);
      border: 1px solid var(--ui-form-border, #d1d5db);
      border-radius: var(--ui-form-radius-sm, 6px);
      padding: 0.35rem 0.75rem;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      color: var(--ui-form-text, #374151);
      transition: all 0.15s ease;
    }

    .reset-schema-btn:hover {
      background: var(--ui-form-border, #e5e7eb);
    }

    .active-pill {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.625rem;
      border-radius: 9999px;
      background-color: var(--ui-form-primary-focus, rgba(79, 70, 229, 0.1));
      color: var(--ui-form-primary, #4f46e5);
      border: 1px solid var(--ui-form-primary, #4f46e5);
    }

    .editor-container {
      width: 100%;
    }

    .schema-textarea {
      width: 100%;
      height: 32rem;
      background: #0f172a;
      color: #7dd3fc;
      border: 1px solid #334155;
      border-radius: var(--ui-form-radius, 8px);
      padding: 1rem;
      font-family: var(--font-mono, monospace);
      font-size: 0.8125rem;
      line-height: 1.5;
      resize: vertical;
      box-sizing: border-box;
      outline: none;
    }

    .schema-textarea:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2);
    }

    .error-banner {
      margin-top: 0.75rem;
      padding: 0.75rem 1rem;
      background: var(--ui-form-error-bg, #fef2f2);
      border: 1px solid var(--ui-form-error-border, #fca5a5);
      border-radius: var(--ui-form-radius-sm, 6px);
      color: var(--ui-form-error-text, #b91c1c);
      font-size: 0.8125rem;
    }

    .submission-card {
      margin-top: 1.5rem;
      border-top: 1px solid var(--ui-form-border, #e5e7eb);
      padding-top: 1.25rem;
    }

    .submission-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--ui-form-success-text, #047857);
      margin-bottom: 0.5rem;
    }

    .submission-code {
      background: #0f172a;
      color: #86efac;
      border-radius: var(--ui-form-radius, 8px);
      padding: 1rem;
      font-family: var(--font-mono, monospace);
      font-size: 0.8rem;
      margin: 0;
      overflow-x: auto;
    }
  `],
})
export class DynamicFormDemoComponent {
  currentSchema = signal<DynamicFormSchema | null>(INITIAL_SCHEMA);
  schemaJsonString = signal<string>(JSON.stringify(INITIAL_SCHEMA, null, 2));
  schemaParseError = signal<string | null>(null);
  submittedOutput = signal<any>(null);

  onSchemaTextChange(text: string): void {
    this.schemaJsonString.set(text);
    try {
      const parsed = JSON.parse(text);
      this.currentSchema.set(parsed);
      this.schemaParseError.set(null);
    } catch (err: any) {
      this.schemaParseError.set(err.message || 'Invalid JSON syntax');
    }
  }

  resetSchema(): void {
    this.currentSchema.set(INITIAL_SCHEMA);
    this.schemaJsonString.set(JSON.stringify(INITIAL_SCHEMA, null, 2));
    this.schemaParseError.set(null);
    this.submittedOutput.set(null);
  }

  onFormSubmit(value: any): void {
    this.submittedOutput.set(value);
  }

  onFormReset(): void {
    this.submittedOutput.set(null);
  }
}

