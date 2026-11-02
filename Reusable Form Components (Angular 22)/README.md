# Angular 22+ Reusable Form Components Suite

A zero-dependency, accessible, highly customizable, and signal-ready form component library and showcase application built for **Angular 22+**.

---

## 🎯 Key Highlights

- **Modern Angular 22 Architecture**: Built natively with Standalone Components, Signal Inputs (`input()`, `input.required()`, `model()`), Signal Outputs (`output()`), and modern control flow (`@if`, `@for`).
- **Complete Form Ecosystem**:
  - `<ui-form>`: Form container with automatic validation triggers, error summary banners, dirty/touched tracking, and submit lifecycle hooks.
  - `<ui-form-field>`: Structural field wrapper with labels, required indicators, hints, and error animations.
  - `<ui-input>`: Versatile text, email, password, number, search inputs with clearable & password toggle support.
  - `<ui-textarea>`: Multi-line text input with character counting and auto-resize.
  - `<ui-select>`: Dropdown with search filtering and custom option grouping.
  - `<ui-checkbox>` & `<ui-checkbox-group>`: Single checkbox and multi-select checkbox arrays.
  - `<ui-radio-group>`: Accessible radio lists with card-style or standard views.
  - `<ui-switch>`: Animated toggle switch with accessibility compliance.
  - `<ui-datepicker>`: Standardized date input with quick preset helpers.
  - `<ui-file-upload>`: Drag-and-drop zone with file list chips and size validation.
  - `<ui-dynamic-form>`: Complete JSON schema-driven form generation engine.
- **Universal Form Binding**: Implements `ControlValueAccessor` to work with `ReactiveFormsModule` (`formControlName`, `[formControl]`), `FormsModule` (`[(ngModel)]`), or Signal two-way bindings.
- **Zero External CSS Dependencies**: 100% scoped CSS powered by CSS Custom Properties (variables). Fully themeable, dark mode ready, and integrates with Tailwind, Bootstrap, or Material if desired.
- **WCAG 2.2 AA Accessibility**: Full ARIA markup (`aria-invalid`, `aria-describedby`, `aria-required`), keyboard focus rings, and screen-reader announcements.

---

## 🚀 Quick Start in Any Angular Project

### 1. Copy the Components
Copy the `src/app/shared/components/forms/` directory into your project's `shared` or `core` folder.

### 2. Import into your Standalone Component
```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  UiFormComponent,
  UiInputComponent,
  UiSelectComponent,
  UiCheckboxComponent,
  UiSwitchComponent
} from './shared/components/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UiFormComponent,
    UiInputComponent,
    UiSelectComponent,
    UiCheckboxComponent,
    UiSwitchComponent
  ],
  template: `
    <ui-form [formGroup]="userForm" (formSubmit)="onSubmit($event)" submitText="Save Changes">
      <ui-input
        formControlName="name"
        label="Full Name"
        placeholder="Jane Doe"
        hint="Enter your legal first and last name"
      />

      <ui-input
        formControlName="email"
        type="email"
        label="Email Address"
        placeholder="jane@example.com"
        clearable
      />

      <ui-select
        formControlName="country"
        label="Country"
        [options]="countryOptions"
        searchable
      />

      <ui-switch
        formControlName="notifications"
        label="Enable Email Notifications"
      />

      <ui-checkbox
        formControlName="agreeTerms"
        label="I agree to the Terms of Service"
      />
    </ui-form>
  `
})
export class UserProfileComponent {
  private fb = inject(FormBuilder);

  userForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    country: ['US', [Validators.required]],
    notifications: [true],
    agreeTerms: [false, [Validators.requiredTrue]]
  });

  countryOptions = [
    { label: 'United States', value: 'US' },
    { label: 'Canada', value: 'CA' },
    { label: 'United Kingdom', value: 'UK' }
  ];

  onSubmit(formValue: any) {
    console.log('Valid Form Submitted:', formValue);
  }
}
```

---

## 🎨 CSS Variable Theming
Override any of the design tokens in your global `styles.css`:

```css
:root {
  --ui-form-primary: #6366f1;
  --ui-form-primary-hover: #4f46e5;
  --ui-form-primary-focus: rgba(99, 102, 241, 0.25);
  --ui-form-radius: 10px;
  --ui-form-border: #e2e8f0;
  --ui-form-bg: #ffffff;
}
```

---

## 📁 Repository Structure

```text
├── Reusable Form Components (Angular 22)/
│   ├── prompt.md                 # Complete Master Engineering Prompt
│   └── README.md                 # Documentation & Architecture Reference
│
└── ReusableFormsApp (Angular 22)/ # Runnable Angular 22 Showcase Site
    ├── src/app/shared/components/forms/
    │   ├── ui-form/              # Form Container Component
    │   ├── ui-form-field/        # Layout & Validation Wrapper
    │   ├── ui-input/             # Text/Email/Password/Number Input
    │   ├── ui-textarea/          # Auto-resizing Textarea
    │   ├── ui-select/            # Searchable Dropdown
    │   ├── ui-checkbox/          # Checkbox & Tri-state
    │   ├── ui-checkbox-group/    # Multi-select Checkbox Group
    │   ├── ui-radio-group/       # Radio Group & Card Options
    │   ├── ui-switch/            # Accessible Toggle Switch
    │   ├── ui-datepicker/        # Standard Date Input
    │   ├── ui-file-upload/       # Drag-and-drop File Upload
    │   ├── ui-dynamic-form/      # Dynamic JSON-Driven Form Engine
    │   ├── services/             # Form Error Resolver Service
    │   └── models/               # Form Types, Interfaces & Schemas
    └── src/app/pages/            # Showcase Demos, Playground, & Component Catalog
```
