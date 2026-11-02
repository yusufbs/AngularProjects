import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  UiFormComponent,
  UiInputComponent,
  UiTextareaComponent,
  UiSelectComponent,
  UiCheckboxComponent,
  UiRadioGroupComponent,
  UiSwitchComponent,
  UiDatepickerComponent,
  UiSelectOption,
  UiRadioOption,
  FormField,
  form,
  required,
  minLength,
  email,
  pattern,
} from '../../shared/components/forms';

@Component({
  selector: 'app-registration-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormField,
    UiFormComponent,
    UiInputComponent,
    UiTextareaComponent,
    UiSelectComponent,
    UiCheckboxComponent,
    UiRadioGroupComponent,
    UiSwitchComponent,
    UiDatepickerComponent,
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
          <h2 class="card-title">User Account & Profile Setup</h2>
          <p class="card-subtitle">
            Powered 100% by <strong>Signal Forms</strong> (<code>@angular/forms/signals</code>) — uses <code>form(profileModel, schema)</code>, <code>[formField]</code> directives, and zero <code>FormGroup</code> / <code>ReactiveFormsModule</code> boilerplate!
          </p>
        </div>

        <ui-form
          [form]="profileForm"
          layout="grid-2"
          submitText="Create Account (Signal Forms)"
          [showReset]="true"
          resetText="Clear Form"
          [loading]="isSubmitting()"
          (formSubmit)="onFormSubmit($event)"
          (formReset)="onFormReset()"
        >
          <!-- Full Name -->
          <ui-input
            [formField]="profileForm.fullName"
            label="Full Name"
            placeholder="Jane Doe"
            hint="Legal first and last name"
            prefixIcon="??"
            required
            clearable
          />

          <!-- Email -->
          <ui-input
            [formField]="profileForm.email"
            type="email"
            label="Work Email"
            placeholder="jane@company.com"
            hint="Used for account verification"
            prefixIcon="??"
            required
            clearable
          />

          <!-- Password -->
          <ui-input
            [formField]="profileForm.password"
            type="password"
            label="Password"
            placeholder="At least 8 characters"
            hint="Must include letters and numbers"
            prefixIcon="??"
            required
            [showPasswordToggle]="true"
          />

          <!-- Date of Birth -->
          <ui-datepicker
            [formField]="profileForm.birthDate"
            label="Date of Birth"
            hint="Must be at least 18 years old"
            required
            quickPresets
          />

          <!-- Country -->
          <ui-select
            [formField]="profileForm.country"
            label="Country / Region"
            placeholder="Select your country..."
            hint="Determines data residency compliance"
            [options]="countryOptions"
            required
            searchable
            clearable
          />

          <!-- Company Size -->
          <ui-select
            [formField]="profileForm.companySize"
            label="Company Size"
            placeholder="Select company size..."
            [options]="companySizeOptions"
            required
          />

          <!-- Biography (Spans full width via CSS) -->
          <div style="grid-column: 1 / -1;">
            <ui-textarea
              [formField]="profileForm.bio"
              label="Professional Summary / Bio"
              placeholder="Brief overview of your experience and role..."
              hint="Visible on your public team profile"
              [rows]="3"
              [maxlength]="200"
              autoResize
              optional
            />
          </div>

          <!-- Plan Selection (Radio Cards, Spans full width) -->
          <div style="grid-column: 1 / -1;">
            <ui-radio-group
              [formField]="profileForm.plan"
              label="Select Subscription Tier"
              hint="You can upgrade or downgrade anytime."
              [options]="planOptions"
              cardStyle
              required
            />
          </div>

          <!-- Toggles (Spans full width) -->
          <div style="grid-column: 1 / -1;" class="toggles-wrapper">
            <ui-switch
              [formField]="profileForm.twoFactor"
              label="Two-Factor Authentication (2FA)"
              description="Require an authenticator code on sensitive administrative actions."
            />

            <ui-switch
              [formField]="profileForm.marketingEmails"
              label="Product Updates & Engineering Briefings"
              description="Receive weekly summaries of new features and platform improvements."
            />

            <ui-checkbox
              [formField]="profileForm.agreeTerms"
              label="I agree to the Enterprise Terms of Service and Privacy Policy"
              description="Required for account activation."
              required
            />
          </div>
        </ui-form>
      </div>

      <!-- State Inspector Column -->
      <div class="demo-card inspector-panel">
        <div class="demo-card-header">
          <div class="inspector-header-top">
            <h3 class="card-title">Live Signal State</h3>
            <span
              class="status-pill"
              [class.valid]="profileForm().valid()"
              [class.invalid]="profileForm().invalid()"
            >
              {{ profileForm().valid() ? 'VALID' : 'INVALID' }}
            </span>
          </div>
          <p class="card-subtitle">Real-time inspection of <code>FieldTree</code> signal reactivity.</p>
        </div>

        <div class="inspector-stats">
          <div class="stat-box">
            <span class="stat-label">Touched</span>
            <span class="stat-value" [class.true-val]="profileForm().touched()">
              {{ profileForm().touched() }}
            </span>
          </div>
          <div class="stat-box">
            <span class="stat-label">Dirty</span>
            <span class="stat-value" [class.true-val]="profileForm().dirty()">
              {{ profileForm().dirty() }}
            </span>
          </div>
          <div class="stat-box">
            <span class="stat-label">Errors</span>
            <span class="stat-value" [class.true-val]="profileForm().errors().length > 0">
              {{ profileForm().errors().length }}
            </span>
          </div>
        </div>

        @if (submittedPayload()) {
          <div class="success-banner" role="status">
            <div class="success-title">
              <svg class="success-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>Successfully Submitted with Signal Forms!</span>
            </div>
            <p class="success-desc">Validated via <code>submit(profileForm, ...)</code> and returned typed signal data.</p>
          </div>
        }

        <div class="json-viewer-header">
          <span>Underlying Model Signal (JSON)</span>
        </div>
        <pre class="json-code"><code>{{ profileModel() | json }}</code></pre>
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

    .toggles-wrapper {
      display: flex;
      flex-direction: column;
      gap: 1.125rem;
      padding: 1rem;
      background: var(--ui-form-surface, #f9fafb);
      border: 1px solid var(--ui-form-border, #e5e7eb);
      border-radius: var(--ui-form-radius, 8px);
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

    .inspector-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.75rem;
      margin-bottom: 1.25rem;
    }

    .stat-box {
      background: var(--ui-form-surface, #f9fafb);
      border: 1px solid var(--ui-form-border, #e5e7eb);
      border-radius: var(--ui-form-radius-sm, 6px);
      padding: 0.625rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .stat-label {
      font-size: 0.7rem;
      text-transform: uppercase;
      font-weight: 600;
      color: var(--ui-form-text-muted, #6b7280);
    }

    .stat-value {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--ui-form-text-muted, #6b7280);
    }

    .stat-value.true-val {
      color: var(--ui-form-primary, #4f46e5);
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
export class RegistrationDemoComponent {
  isSubmitting = signal<boolean>(false);
  submittedPayload = signal<any>(null);

  // 1. The pure Model Signal
  profileModel = signal({
    fullName: '',
    email: '',
    password: '',
    birthDate: '',
    country: '',
    companySize: '1-10',
    bio: '',
    plan: 'pro',
    twoFactor: true,
    marketingEmails: false,
    agreeTerms: false,
  });

  // 2. The Angular 22 Signal Forms FieldTree!
  profileForm = form(this.profileModel, (p) => {
    required(p.fullName, { message: 'Full name is required.' });
    minLength(p.fullName, 2, { message: 'Must be at least 2 characters.' });
    required(p.email, { message: 'Work email is required.' });
    email(p.email, { message: 'Please enter a valid work email address.' });
    required(p.password, { message: 'Password is required.' });
    minLength(p.password, 8, { message: 'Password must be at least 8 characters long.' });
    pattern(p.password, /^(?=.*[0-9])/, { message: 'Password must contain at least 1 number.' });
    required(p.birthDate, { message: 'Date of birth is required.' });
    required(p.country, { message: 'Please select your country / region.' });
    required(p.companySize, { message: 'Please select company size.' });
    required(p.plan, { message: 'Please select a subscription tier.' });
    required(p.agreeTerms, { message: 'You must agree to the Terms of Service to continue.' });
  });

  countryOptions: UiSelectOption[] = [
    { label: 'United States', value: 'US' },
    { label: 'United Kingdom', value: 'GB' },
    { label: 'Canada', value: 'CA' },
    { label: 'Germany', value: 'DE' },
    { label: 'France', value: 'FR' },
    { label: 'Japan', value: 'JP' },
    { label: 'Australia', value: 'AU' },
    { label: 'Singapore', value: 'SG' },
  ];

  companySizeOptions: UiSelectOption[] = [
    { label: 'Solo / Founder (1)', value: '1' },
    { label: 'Small Team (2 - 10)', value: '1-10' },
    { label: 'Medium Business (11 - 50)', value: '11-50' },
    { label: 'Enterprise (50+)', value: '50+' },
  ];

  planOptions: UiRadioOption[] = [
    {
      label: 'Starter Plan',
      value: 'starter',
      description: 'Free forever. Ideal for personal experimentation.',
    },
    {
      label: 'Professional Tier',
      value: 'pro',
      description: '$49/mo. Advanced form validation & multi-tenancy.',
    },
    {
      label: 'Enterprise Scale',
      value: 'enterprise',
      description: 'Custom SLA, zero-trust SSO, and dedicated cluster.',
    },
  ];

  onFormSubmit(value: any): void {
    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.submittedPayload.set(value);
    }, 600);
  }

  onFormReset(): void {
    this.submittedPayload.set(null);
  }
}
