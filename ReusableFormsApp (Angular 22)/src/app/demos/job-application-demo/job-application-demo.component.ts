import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  UiFormComponent,
  UiInputComponent,
  UiTextareaComponent,
  UiSelectComponent,
  UiCheckboxGroupComponent,
  UiFileUploadComponent,
  UiSelectOption,
  UiCheckboxOption,
  FormField,
  form,
  required,
  minLength,
  email,
  min,
  max,
  pattern,
} from '../../shared/components/forms';

@Component({
  selector: 'app-job-application-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormField,
    UiFormComponent,
    UiInputComponent,
    UiTextareaComponent,
    UiSelectComponent,
    UiCheckboxGroupComponent,
    UiFileUploadComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="demo-grid">
      <!-- Form Column -->
      <div class="demo-card form-panel">
        <div class="demo-card-header">
          <div class="badge-row">
            <span class="signal-tag">? Angular 22 Signal Forms</span>
          </div>
          <h2 class="card-title">Engineering Career Application</h2>
          <p class="card-subtitle">
            Demonstrating <code>&lt;ui-file-upload&gt;</code> for resume attachments and <code>&lt;ui-checkbox-group&gt;</code> for multi-value arrays bound directly via <code>[formField]</code>.
          </p>
        </div>

        <ui-form
          [form]="jobForm"
          layout="grid-2"
          submitText="Submit Application (Signal Forms)"
          [showReset]="true"
          resetText="Clear"
          [loading]="isSubmitting()"
          (formSubmit)="onFormSubmit($event)"
          (formReset)="onFormReset()"
        >
          <!-- Candidate Name -->
          <ui-input
            [formField]="jobForm.applicantName"
            label="Candidate Name"
            placeholder="Morgan Vance"
            prefixIcon="??"
            required
            clearable
          />

          <!-- Email -->
          <ui-input
            [formField]="jobForm.email"
            type="email"
            label="Email Address"
            placeholder="morgan@engineering.dev"
            prefixIcon="??"
            required
            clearable
          />

          <!-- Role -->
          <ui-select
            [formField]="jobForm.role"
            label="Role Applied For"
            placeholder="Select a position..."
            [options]="roleOptions"
            required
          />

          <!-- Expected Salary -->
          <ui-input
            [formField]="jobForm.expectedSalary"
            type="number"
            label="Expected Base Salary (USD / yr)"
            placeholder="150000"
            hint="Numbers only"
            prefixIcon="??"
            [min]="40000"
            [max]="500000"
            required
          />

          <!-- Portfolio URL (Full width) -->
          <div style="grid-column: 1 / -1;">
            <ui-input
              [formField]="jobForm.portfolioUrl"
              type="url"
              label="GitHub or Portfolio URL"
              placeholder="https://github.com/username"
              hint="Must be a valid URL starting with http:// or https://"
              prefixIcon="??"
              required
              clearable
            />
          </div>

          <!-- Skills Matrix (Full width) -->
          <div style="grid-column: 1 / -1;">
            <ui-checkbox-group
              [formField]="jobForm.skills"
              label="Core Technical Proficiencies"
              hint="Select at least one skill that aligns with your primary expertise."
              [options]="skillsOptions"
              orientation="horizontal"
              required
            />
          </div>

          <!-- Resume File Upload (Full width) -->
          <div style="grid-column: 1 / -1;">
            <ui-file-upload
              [formField]="jobForm.resumeFile"
              label="Attach Resume / Curriculum Vitae"
              hint="PDF or Word documents accepted (up to 10MB)."
              accept=".pdf,.doc,.docx"
              required
            />
          </div>

          <!-- Cover Letter (Full width) -->
          <div style="grid-column: 1 / -1;">
            <ui-textarea
              [formField]="jobForm.coverLetter"
              label="Why are you interested in this role?"
              placeholder="Highlight any relevant open-source contributions or architectural achievements..."
              [rows]="4"
              [maxlength]="400"
              autoResize
              optional
            />
          </div>
        </ui-form>
      </div>

      <!-- State Inspector Column -->
      <div class="demo-card inspector-panel">
        <div class="demo-card-header">
          <div class="inspector-header-top">
            <h3 class="card-title">Submission Diagnostics</h3>
            <span
              class="status-pill"
              [class.valid]="jobForm().valid()"
              [class.invalid]="jobForm().invalid()"
            >
              {{ jobForm().valid() ? 'READY' : 'INCOMPLETE' }}
            </span>
          </div>
          <p class="card-subtitle">Real-time signal inspection of binary files and array data.</p>
        </div>

        @if (submittedData()) {
          <div class="success-banner" role="status">
            <div class="success-title">
              <svg class="success-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>Application Received via Signal Forms!</span>
            </div>
            <p class="success-desc">Resume file attached and skills array processed cleanly.</p>
          </div>
        }

        <div class="json-viewer-header">
          <span>Active Model Signal Value (JSON)</span>
        </div>
        <pre class="json-code"><code>{{ serializeFormValue(jobModel()) }}</code></pre>
      </div>
    </div>
  `,
  styles: [`
    .demo-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.4fr) minmax(0, 0.9fr);
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

    .badge-row {
      margin-bottom: 0.5rem;
    }

    .signal-tag {
      font-size: 0.725rem;
      font-weight: 700;
      color: #4f46e5;
      background: rgba(79, 70, 229, 0.1);
      border: 1px solid rgba(79, 70, 229, 0.2);
      padding: 0.2rem 0.5rem;
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
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

    .inspector-header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .status-pill {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.625rem;
      border-radius: 9999px;
      letter-spacing: 0.05em;
    }

    .status-pill.valid {
      background-color: var(--ui-form-success-bg, #ecfdf5);
      color: var(--ui-form-success-text, #047857);
      border: 1px solid var(--ui-form-success-border, #a7f3d0);
    }

    .status-pill.invalid {
      background-color: var(--ui-form-error-bg, #fef2f2);
      color: var(--ui-form-error-text, #b91c1c);
      border: 1px solid var(--ui-form-error-border, #fca5a5);
    }

    .success-banner {
      background: var(--ui-form-success-bg, #ecfdf5);
      border: 1px solid var(--ui-form-success-border, #a7f3d0);
      border-radius: var(--ui-form-radius, 8px);
      padding: 1rem;
      margin-bottom: 1.25rem;
    }

    .success-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--ui-form-success-text, #047857);
      font-weight: 600;
      font-size: 0.9rem;
    }

    .success-icon {
      width: 1.25rem;
      height: 1.25rem;
    }

    .success-desc {
      margin: 0.25rem 0 0 1.75rem;
      font-size: 0.8rem;
      color: var(--ui-form-success-text, #047857);
    }

    .json-viewer-header {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--ui-form-text-muted, #6b7280);
      margin-bottom: 0.5rem;
    }

    .json-code {
      background: #0f172a;
      color: #38bdf8;
      border-radius: var(--ui-form-radius, 8px);
      padding: 1rem;
      font-family: var(--font-mono, monospace);
      font-size: 0.8rem;
      overflow-x: auto;
      max-height: 24rem;
      margin: 0;
    }
  `],
})
export class JobApplicationDemoComponent {
  isSubmitting = signal<boolean>(false);
  submittedData = signal<any>(null);

  jobModel = signal({
    applicantName: '',
    email: '',
    role: 'senior-frontend',
    expectedSalary: 160000,
    portfolioUrl: '',
    skills: ['Angular', 'TypeScript'] as string[],
    resumeFile: null as any,
    coverLetter: '',
  });

  jobForm = form(this.jobModel, (j) => {
    required(j.applicantName, { message: 'Candidate name is required.' });
    minLength(j.applicantName, 2, { message: 'Must be at least 2 characters.' });
    required(j.email, { message: 'Email address is required.' });
    email(j.email, { message: 'Please enter a valid email address.' });
    required(j.role, { message: 'Role applied for is required.' });
    required(j.expectedSalary, { message: 'Expected salary is required.' });
    min(j.expectedSalary, 40000, { message: 'Salary must be at least $40,000.' });
    max(j.expectedSalary, 500000, { message: 'Salary cannot exceed $500,000.' });
    required(j.portfolioUrl, { message: 'Portfolio or GitHub URL is required.' });
    pattern(j.portfolioUrl, /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, {
      message: 'Must be a valid URL starting with http:// or https://',
    });
    required(j.skills, { message: 'Select at least one skill proficiency.' });
    required(j.resumeFile, { message: 'Resume document is required.' });
  });

  roleOptions: UiSelectOption[] = [
    { label: 'Staff Frontend Architect (Angular 22)', value: 'staff-frontend' },
    { label: 'Senior Angular Engineer', value: 'senior-frontend' },
    { label: 'Full Stack TypeScript Engineer', value: 'fullstack-ts' },
    { label: 'Design System / UI Platform Engineer', value: 'ui-platform' },
  ];

  skillsOptions: UiCheckboxOption[] = [
    { label: 'Angular 22+ (Signal Forms)', value: 'Angular' },
    { label: 'TypeScript 6.x', value: 'TypeScript' },
    { label: 'Signals Architecture', value: 'RxJS' },
    { label: 'Web Components & A11y', value: 'Accessibility' },
    { label: 'Node.js / Bun', value: 'Node' },
    { label: 'GraphQL & REST', value: 'API' },
  ];

  onFormSubmit(value: any): void {
    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.submittedData.set(value);
    }, 600);
  }

  onFormReset(): void {
    this.submittedData.set(null);
  }

  serializeFormValue(val: any): string {
    const copy = { ...val };
    if (copy.resumeFile instanceof File) {
      copy.resumeFile = `[File: ${copy.resumeFile.name} (${copy.resumeFile.size} bytes)]`;
    }
    return JSON.stringify(copy, null, 2);
  }
}
