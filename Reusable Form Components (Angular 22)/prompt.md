# Master Prompt: Production-Grade Reusable Form Component Suite (Angular 22+ Signal Forms)

## Project Location
The full runnable project and component library have been placed in:
`C:\Projects\AngularProjects\ReusableFormsApp (Angular 22)`

## Quick Launch
```powershell
cd "C:\Projects\AngularProjects\ReusableFormsApp (Angular 22)"
npm start
```
Then open: `http://localhost:4200`

---

> **System Role**: Act as a **Principal Frontend Architect and Staff Angular Engineer**. Your task is to design, generate, and implement a **complete, zero-dependency, production-grade reusable form component suite** using **Angular 22 or above** powered natively by **Signal Forms** (`@angular/forms/signals`).
> 
> The suite must package both the **form container itself** (`<ui-form>`) and **all primary form elements** (`<ui-input>`, `<ui-textarea>`, `<ui-select>`, `<ui-checkbox>`, `<ui-checkbox-group>`, `<ui-radio-group>`, `<ui-switch>`, `<ui-datepicker>`, `<ui-file-upload>`, `<ui-form-field>`, and `<ui-dynamic-form>`) into cleanly decoupled, accessible, and themeable standalone components that can be dropped into **any** modern Angular application.

---

## 1. Architectural Foundations (Angular 22+ Signal Forms)

Every component generated under this prompt must strictly adhere to Angular 22 Signal Forms conventions:

1. **Signal Forms Native**:
   - Use `@angular/forms/signals` as the form foundation.
   - Forms are created using `form(modelSignal, schemaFn)` which returns a `FieldTree`.
   - Form fields bind directly in templates via the `[formField]` directive (`<ui-input [formField]="profileForm.email" />`).
   - Eliminate legacy `FormGroup`, `FormControl`, and `FormBuilder` boilerplate. Forms bind directly to model signals (`model = signal({...})`).
   - Submissions use the typed `submit(formTree, async () => { ... })` function which automatically handles validation, marks all fields as touched, and focuses the first invalid element on failure.
2. **Signal-First Component Reactivity**:
   - Component inputs must use `input()`, `input.required()`, and `model()`.
   - Boolean attributes use `transform: booleanAttribute` for clean bare attribute support (`<ui-input clearable required>`).
   - Component events use the `output()` API.
   - Derived state uses `computed()`.
   - Fully compatible with Zoneless Change Detection (`provideExperimentalZonelessChangeDetection()`).
3. **Universal Control Binding & Compatibility**:
   - Components work seamlessly with `[formField]="form.fieldName"`.
   - Also support direct two-way Signal bindings (`[(value)]="sig"`) and template-driven `[(ngModel)]`.
4. **WCAG 2.2 AA Accessibility**:
   - Auto-generated unique IDs linking `<label for="...">` to inputs.
   - `aria-invalid` bound directly to field validity and touched/dirty state.
   - `aria-describedby` referencing active error messages or hint text.
   - Full keyboard navigation (Arrow keys for radio groups and custom dropdowns, Space/Enter for switches and file triggers).
   - High-contrast focus rings via `:focus-visible`.
5. **Zero External CSS Framework Dependencies**:
   - 100% scoped CSS powered by CSS Custom Properties (`--ui-form-primary`, `--ui-form-border`, `--ui-form-error`, etc.).
   - Built-in Dark Mode support via `[data-theme="dark"]`.
6. **Clean Multi-File Separation of Concerns**:
   - Every component separates template and styling into dedicated files (`.component.html` and `.component.css`) using `templateUrl` and `styleUrl`.
   - Zero inline templates or inline style arrays in component decorators.

---

## 2. Component Specifications & Catalog

### A. The Form Container (`UiFormComponent` / `<ui-form>`)
- **Selector**: `ui-form`
- **Role**: Reusable form wrapper handling submission lifecycle, reset, validation aggregation, and UX polish for Signal Forms.
- **Inputs**:
  - `form`: `input.required<FieldTree<any>>()` — the Signal Forms `FieldTree` instance.
  - `showErrorSummary`: `input(true, { transform: booleanAttribute })` — displays an accessible alert banner listing invalid fields when submission fails.
  - `submitText`: `input<string>('Submit')`
  - `showReset`: `input(false, { transform: booleanAttribute })`
  - `resetText`: `input<string>('Reset')`
  - `layout`: `input<'stacked' | 'grid-2' | 'grid-3'>('stacked')`
  - `loading`: `input(false, { transform: booleanAttribute })`
- **Outputs**:
  - `formSubmit`: `output<any>()` — emits the typed value ONLY if form is valid.
  - `formReset`: `output<void>()`
  - `invalidSubmit`: `output<any>()` — emits validation errors if user attempted submit while invalid.
- **Key Behaviors**:
  - Uses `await submit(this.form(), async () => { this.formSubmit.emit(this.form()().value()); })`.
  - Automatically scrolls to and focuses the first invalid form control.

---

### B. Form Field Wrapper (`UiFormFieldComponent` / `<ui-form-field>`)
- **Selector**: `ui-form-field`
- **Role**: Reusable layout primitive wrapping any input control with label, required asterisk, optional badge, helper text, and error messaging.

---

### C. Text & Numeric Input (`UiInputComponent` / `<ui-input>`)
- **Selector**: `ui-input`
- **Inputs**: `type`, `label`, `placeholder`, `hint`, `clearable`, `showPasswordToggle`, `min`, `max`, `step`, `maxlength`, `readonly`, `disabled`, `prefixIcon`, `suffixIcon`.
- **Signal Forms**: Binds with `[formField]="form.controlName"`.

---

### D. Multi-line Textarea (`UiTextareaComponent` / `<ui-textarea>`)
- **Selector**: `ui-textarea`
- **Inputs**: `label`, `placeholder`, `hint`, `rows`, `maxlength`, `autoResize`.

---

### E. Select / Dropdown (`UiSelectComponent` / `<ui-select>`)
- **Selector**: `ui-select`
- **Inputs**: `label`, `placeholder`, `hint`, `options`, `searchable`, `clearable`.

---

### F. Checkbox & Checkbox Group (`UiCheckboxComponent` & `UiCheckboxGroupComponent`)
- **Selectors**: `ui-checkbox`, `ui-checkbox-group`
- Single checkbox with tri-state indeterminate support; checkbox group bound to array values.

---

### G. Radio Group (`UiRadioGroupComponent` / `<ui-radio-group>`)
- **Selector**: `ui-radio-group`
- Standard circular radios or modern selectable card tiles with keyboard navigation.

---

### H. Toggle Switch (`UiSwitchComponent` / `<ui-switch>`)
- **Selector**: `ui-switch`
- Smooth animated pill switch with accessible role `switch`.

---

### I. Datepicker (`UiDatepickerComponent` / `<ui-datepicker>`)
- **Selector**: `ui-datepicker`
- Standard date input with quick offset presets ("Today", "Tomorrow", "+7 Days", "+30 Days").

---

### J. Drag & Drop File Upload (`UiFileUploadComponent` / `<ui-file-upload>`)
- **Selector**: `ui-file-upload`
- Drag-and-drop zone with file picker, file size limits, and removable preview chips.

---

### K. Dynamic Signal Forms Engine (`UiDynamicFormComponent` / `<ui-dynamic-form>`)
- **Selector**: `ui-dynamic-form`
- Takes a JSON schema (`DynamicFormSchema`), creates an underlying model signal, builds the Signal Forms `FieldTree`, and renders all matching components dynamically with conditional visibility (`dependsOn`).

---

## 3. Code Example: Signal Forms in Action

```typescript
import { Component, signal } from '@angular/core';
import {
  UiFormComponent,
  UiInputComponent,
  UiSelectComponent,
  UiSwitchComponent,
  UiCheckboxComponent,
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
    UiSwitchComponent,
    UiCheckboxComponent,
  ],
  template: `
    <ui-form [form]="userForm" (formSubmit)="onSubmit($event)" submitText="Save Changes">
      <ui-input
        [formField]="userForm.name"
        label="Full Name"
        placeholder="Jane Doe"
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
  // 1. Model Signal
  userModel = signal({
    name: '',
    email: '',
    country: 'US',
    notifications: true,
    agreeTerms: false,
  });

  // 2. Signal Forms FieldTree
  userForm = form(this.userModel, (u) => {
    required(u.name, { message: 'Name is required' });
    minLength(u.name, 2, { message: 'Name must be at least 2 characters' });
    required(u.email, { message: 'Email is required' });
    email(u.email, { message: 'Must be a valid email' });
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
