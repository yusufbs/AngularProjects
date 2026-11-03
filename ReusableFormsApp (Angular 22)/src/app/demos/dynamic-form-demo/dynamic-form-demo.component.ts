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
  templateUrl: './dynamic-form-demo.component.html',
  styleUrl: './dynamic-form-demo.component.css',
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

