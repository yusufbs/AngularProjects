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
  templateUrl: './registration-demo.component.html',
  styleUrl: './registration-demo.component.css',
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
