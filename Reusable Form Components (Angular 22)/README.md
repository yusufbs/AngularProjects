# Angular 22+ Reusable Form Components Suite (Signal Forms)

A zero-dependency, accessible, highly customizable, and signal-native form component library and showcase application built for **Angular 22+** powered by **`@angular/forms/signals`**.

---

## 🎯 Key Highlights

- **Native Angular 22 Signal Forms**:
  - Replaces legacy `FormGroup`, `FormControl`, and `FormBuilder` with modern `form(model, schema)`, `FieldTree`, and `[formField]` directives.
  - Reactive model signals (`model = signal({...})`) serve as the source of truth with bidirectional synchronization.
  - Type-safe, functional validation (`required`, `email`, `minLength`, `maxLength`, `min`, `max`, `pattern`).
  - Asynchronous form submission and invalid autofocus using `submit(formTree, action)`.
- **Complete Form Ecosystem**:
  - `<ui-form>`: Form container component accepting `[form]="fieldTree"`.
  - `<ui-form-field>`: Structural field wrapper with labels, required asterisks, hints, and error animations.
  - `<ui-input>`: Versatile text, email, password, number, search inputs with clearable & password toggle support.
  - `<ui-textarea>`: Multi-line text input with character counting and auto-resize.
  - `<ui-select>`: Dropdown with search filtering and custom option grouping.
  - `<ui-checkbox>` & `<ui-checkbox-group>`: Single checkbox and multi-select checkbox arrays.
  - `<ui-radio-group>`: Accessible radio lists with card-style or standard views.
  - `<ui-switch>`: Animated toggle switch with accessibility compliance.
  - `<ui-datepicker>`: Standardized date input with quick preset helpers.
  - `<ui-file-upload>`: Drag-and-drop zone with file list chips and size validation.
  - `<ui-dynamic-form>`: Complete JSON schema-driven dynamic form generation engine powered by Signal Forms.
- **Universal Binding**: Works seamlessly with `[formField]`, direct two-way signals (`[(value)]`), and `[(ngModel)]`.
- **Zero External CSS Dependencies**: 100% scoped CSS powered by CSS Custom Properties (variables). Fully themeable, dark mode ready.
- **WCAG 2.2 AA Accessibility**: Full ARIA markup (`aria-invalid`, `aria-describedby`), keyboard focus rings, and screen-reader announcements.

---

## 🚀 Quick Start with Signal Forms

### 1. Copy the Components
Copy the `src/app/shared/components/forms/` directory into your project's `shared` or `core` folder.

### 2. Import into your Standalone Component
```typescript
import { Component, signal } from '@angular/core';
import {
  UiFormComponent,
  UiInputComponent,
  UiSelectComponent,
  UiCheckboxComponent,
  UiSwitchComponent,
  FormField,
  form,
  required,
  email,
  minLength,
} from './shared/components/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    FormField,
    UiFormComponent,
    UiInputComponent,
    UiSelectComponent,
    UiCheckboxComponent,
    UiSwitchComponent,
  ],
  template: `
    <ui-form [form]="userForm" (formSubmit)="onSubmit($event)" submitText="Save Changes">
      <ui-input
        [formField]="userForm.name"
        label="Full Name"
        placeholder="Jane Doe"
        hint="Enter your legal first and last name"
        required
        clearable
      />

      <ui-input
        [formField]="userForm.email"
        type="email"
        label="Email Address"
        placeholder="jane@example.com"
        required
        clearable
      />

      <ui-select
        [formField]="userForm.country"
        label="Country"
        [options]="countryOptions"
        searchable
        required
      />

      <ui-switch
        [formField]="userForm.notifications"
        label="Enable Email Notifications"
      />

      <ui-checkbox
        [formField]="userForm.agreeTerms"
        label="I agree to the Terms of Service"
        required
      />
    </ui-form>
  `
})
export class UserProfileComponent {
  // Model Signal
  userModel = signal({
    name: '',
    email: '',
    country: 'US',
    notifications: true,
    agreeTerms: false,
  });

  // Signal Forms FieldTree
  userForm = form(this.userModel, (u) => {
    required(u.name, { message: 'Full name is required' });
    minLength(u.name, 2, { message: 'Must be at least 2 characters' });
    required(u.email, { message: 'Email address is required' });
    email(u.email, { message: 'Please enter a valid email address' });
    required(u.country, { message: 'Country is required' });
    required(u.agreeTerms, { message: 'You must agree to the Terms' });
  });

  countryOptions = [
    { label: 'United States', value: 'US' },
    { label: 'Canada', value: 'CA' },
    { label: 'United Kingdom', value: 'UK' },
  ];

  onSubmit(formValue: any) {
    console.log('Valid Signal Form Submitted:', formValue);
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
