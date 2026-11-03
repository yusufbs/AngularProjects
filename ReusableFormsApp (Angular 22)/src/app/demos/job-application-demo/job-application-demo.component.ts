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
  templateUrl: './job-application-demo.component.html',
  styleUrl: './job-application-demo.component.css',
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
