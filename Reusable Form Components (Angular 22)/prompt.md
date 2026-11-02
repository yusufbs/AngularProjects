# Master Prompt: Production-Grade Reusable Form Component Suite (Angular 22+)

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

> **System Role**: Act as a **Principal Frontend Architect and Staff Angular Engineer**. Your task is to design, generate, and implement a **complete, zero-dependency, production-grade reusable form component suite** using **Angular 22 or above**.
> 
> The suite must package both the **form container itself** (`<ui-form>`) and **all primary form elements** (`<ui-input>`, `<ui-textarea>`, `<ui-select>`, `<ui-checkbox>`, `<ui-checkbox-group>`, `<ui-radio-group>`, `<ui-switch>`, `<ui-datepicker>`, `<ui-file-upload>`, `<ui-form-field>`, and `<ui-dynamic-form>`) into cleanly decoupled, accessible, and themeable standalone components that can be dropped into **any** modern Angular application.

---

## 1. Architectural Foundations (Angular 22+ Standards)

Every component generated under this prompt must strictly adhere to modern Angular 22 conventions:

1. **Standalone & Clean Imports**:
   - Every component must be standalone.
   - Use direct, minimal imports (`ReactiveFormsModule`, `FormsModule`, `CommonModule` or native control flow `@if`, `@for`, `@switch`).
2. **Signal-First Reactivity**:
   - Use `input()`, `input.required()`, and `model()` for component inputs.
   - Use `output()` for custom event emitters.
   - Use `computed()` for derived state (e.g. character counter, CSS classes, validation summaries).
   - Fully compatible with Zoneless Change Detection (`provideExperimentalZonelessChangeDetection()`).
3. **Seamless Form Integration (ControlValueAccessor & Reactive Forms)**:
   - All input controls must implement `ControlValueAccessor` via `NG_VALUE_ACCESSOR` or inject `NgControl` (using `inject(NgControl, { optional: true, self: true })`).
   - Must work interchangeably with:
     - Reactive Forms (`[formControl]="ctrl"`, `formControlName="name"`)
     - Template-driven forms (`[(ngModel)]="val"`)
     - Direct two-way Signal bindings (`[(value)]="val"`)
4. **WCAG 2.2 AA Accessibility**:
   - Unique auto-generated or explicitly provided IDs linking `<label for="id">` to `<input id="...">`.
   - `aria-describedby` referencing active error message or helper text.
   - `aria-invalid="true"` dynamically assigned when the control is invalid and touched/dirty.
   - `aria-required="true"` when marked as required.
   - Full keyboard accessibility (Tab, Enter, Space, Arrow keys for radio groups and custom dropdowns).
   - High-contrast focus rings via `:focus-visible`.
5. **Zero External CSS Framework Dependencies & Full Theming**:
   - Self-contained, scoped styles using modern CSS custom properties (variables) with sensible, polished defaults:
     ```css
     :root {
       --ui-form-primary: #4f46e5;
       --ui-form-primary-hover: #4338ca;
       --ui-form-primary-focus: rgba(79, 70, 229, 0.25);
       --ui-form-border: #d1d5db;
       --ui-form-border-hover: #9ca3af;
       --ui-form-bg: #ffffff;
       --ui-form-bg-disabled: #f3f4f6;
       --ui-form-text: #111827;
       --ui-form-text-muted: #6b7280;
       --ui-form-error: #ef4444;
       --ui-form-error-bg: #fef2f2;
       --ui-form-error-border: #fca5a5;
       --ui-form-success: #10b981;
       --ui-form-radius: 8px;
       --ui-form-font-family: inherit;
       --ui-form-transition: 0.15s ease-in-out;
     }
     ```
   - Automatically supports dark mode overrides via `[data-theme="dark"]` or media query `@media (prefers-color-scheme: dark)`.

---

## 2. Component Specifications & Catalog

### A. The Form Container (`UiFormComponent` / `<ui-form>`)
- **Selector**: `ui-form`
- **Role**: Reusable form wrapper handling submission lifecycle, reset, validation aggregation, and UX polish.
- **Inputs**:
  - `formGroup`: `input.required<FormGroup>()`
  - `showErrorSummary`: `input<boolean>(false)` — whether to display an accessible alert banner listing invalid fields when submission fails.
  - `submitText`: `input<string>('Submit')`
  - `showReset`: `input<boolean>(false)`
  - `resetText`: `input<string>('Reset')`
  - `layout`: `input<'stacked' | 'grid-2' | 'grid-3'>('stacked')`
  - `loading`: `input<boolean>(false)`
- **Outputs**:
  - `formSubmit`: `output<any>()` — emits the typed `formGroup.value` ONLY if form is valid.
  - `formReset`: `output<void>()`
  - `invalidSubmit`: `output<ValidationErrors>()` — emits validation errors if user attempted submit while invalid.
- **Key Behaviors**:
  - Automatically runs `this.formGroup().markAllAsTouched()` upon submit attempt.
  - Auto-scrolls to and focuses the first invalid form control.
  - Provides a flexible `<ng-content></ng-content>` slot for form controls and an optional `<ng-content select="[actions]"></ng-content>` slot for custom action buttons.

---

### B. Form Field Wrapper (`UiFormFieldComponent` / `<ui-form-field>`)
- **Selector**: `ui-form-field`
- **Role**: Reusable layout primitive wrapping any input control with label, required star, helper text, and error messaging.
- **Inputs**:
  - `label`: `input<string>('')`
  - `id`: `input<string>('')` (auto-generates unique ID if omitted)
  - `required`: `input<boolean>(false)`
  - `optional`: `input<boolean>(false)` — displays "(Optional)" badge
  - `hint`: `input<string>('')` — contextual helper text
  - `errorMessage`: `input<string>('')` — explicit error override
  - `control`: `input<AbstractControl | null>(null)` — optional direct reference to control for automated error resolution
- **Features**:
  - Smooth animated entrance for validation errors.
  - Prefix/Suffix template slots (`<ng-content select="[prefix]"></ng-content>`, `<ng-content select="[suffix]"></ng-content>`).
  - Character counter display when paired with text inputs.

---

### C. Text & Numeric Input (`UiInputComponent` / `<ui-input>`)
- **Selector**: `ui-input`
- **Inputs**:
  - `type`: `input<'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'>('text')`
  - `label`: `input<string>('')`
  - `placeholder`: `input<string>('')`
  - `hint`: `input<string>('')`
  - `clearable`: `input<boolean>(false)` — shows one-click clear button when text is present
  - `showPasswordToggle`: `input<boolean>(true)` — for password inputs, renders a show/hide toggle icon
  - `min`: `input<number | null>(null)`
  - `max`: `input<number | null>(null)`
  - `step`: `input<number | null>(null)`
  - `maxlength`: `input<number | null>(null)`
  - `readonly`: `input<boolean>(false)`
  - `prefixIcon`: `input<string>('')`
  - `suffixIcon`: `input<string>('')`
- **Features**:
  - Full `ControlValueAccessor` integration.
  - Automatically extracts validation errors from bound `NgControl`.
  - Floating label or standard top label mode.

---

### D. Multi-line Textarea (`UiTextareaComponent` / `<ui-textarea>`)
- **Selector**: `ui-textarea`
- **Inputs**:
  - `label`: `input<string>('')`
  - `placeholder`: `input<string>('')`
  - `hint`: `input<string>('')`
  - `rows`: `input<number>(4)`
  - `maxlength`: `input<number | null>(null)`
  - `showCharCount`: `input<boolean>(true)`
  - `autoResize`: `input<boolean>(false)` — dynamically grows with multi-line content
- **Features**:
  - Live character count readout (`current / max`).
  - Accessible `aria-describedby` integration.

---

### E. Select / Dropdown (`UiSelectComponent` / `<ui-select>`)
- **Selector**: `ui-select`
- **Inputs**:
  - `label`: `input<string>('')`
  - `placeholder`: `input<string>('Select an option...')`
  - `hint`: `input<string>('')`
  - `options`: `input.required<UiSelectOption[]>()`
    ```typescript
    export interface UiSelectOption {
      label: string;
      value: any;
      disabled?: boolean;
      group?: string;
      icon?: string;
    }
    ```
  - `searchable`: `input<boolean>(false)` — enables live inline filtering
  - `clearable`: `input<boolean>(false)`
- **Features**:
  - Optgroup grouping support.
  - Native select fallback or accessible custom popover select with keyboard arrows & Esc support.

---

### F. Checkbox & Checkbox Group (`UiCheckboxComponent` & `UiCheckboxGroupComponent`)
- **Selectors**: `ui-checkbox`, `ui-checkbox-group`
- **`ui-checkbox`**:
  - Single boolean or custom value check.
  - Supports `indeterminate` state (tri-state).
  - Rich label with optional subtitle/description slot.
- **`ui-checkbox-group`**:
  - Binds to an array of selected values (`T[]`).
  - Inputs: `options: input.required<UiCheckboxOption[]>()`, `orientation: input<'horizontal' | 'vertical'>('vertical')`.
  - Automatically toggles items in and out of the bound array value.

---

### G. Radio Group (`UiRadioGroupComponent` / `<ui-radio-group>`)
- **Selector**: `ui-radio-group`
- **Inputs**:
  - `label`: `input<string>('')`
  - `hint`: `input<string>('')`
  - `options`: `input.required<UiRadioOption[]>()`
  - `orientation`: `input<'horizontal' | 'vertical'>('vertical')`
  - `cardStyle`: `input<boolean>(false)` — renders options as rich selectable cards with icons and descriptions
- **Features**:
  - Full WAI-ARIA radio group keyboard navigation (Arrow Up/Down/Left/Right).

---

### H. Toggle Switch (`UiSwitchComponent` / `<ui-switch>`)
- **Selector**: `ui-switch`
- **Inputs**:
  - `label`: `input<string>('')`
  - `description`: `input<string>('')`
  - `labelPosition`: `input<'left' | 'right'>('right')`
  - `color`: `input<'primary' | 'success'>('primary')`
- **Features**:
  - Smooth animated pill switch with accessible role `switch` and `aria-checked`.

---

### I. Datepicker (`UiDatepickerComponent` / `<ui-datepicker>`)
- **Selector**: `ui-datepicker`
- **Inputs**:
  - `label`: `input<string>('')`
  - `hint`: `input<string>('')`
  - `min`: `input<string | null>(null)` (YYYY-MM-DD)
  - `max`: `input<string | null>(null)`
  - `quickPresets`: `input<boolean>(false)` — renders quick select buttons ("Today", "+7 Days", "+30 Days")
- **Features**:
  - Normalized date output formatting.

---

### J. Drag & Drop File Upload (`UiFileUploadComponent` / `<ui-file-upload>`)
- **Selector**: `ui-file-upload`
- **Inputs**:
  - `label`: `input<string>('')`
  - `hint`: `input<string>('')`
  - `accept`: `input<string>('*')` (e.g. `image/*, .pdf, .docx`)
  - `multiple`: `input<boolean>(false)`
  - `maxSizeBytes`: `input<number>(10 * 1024 * 1024)` (10MB default)
- **Features**:
  - Visual drag-over highlighting with dropzone.
  - File chips list displaying file name, formatted size (KB/MB), and remove button.
  - Automatically sets form control errors if file exceeds size limit or invalid type.

---

### K. Dynamic JSON-Driven Form Engine (`UiDynamicFormComponent` / `<ui-dynamic-form>`)
- **Selector**: `ui-dynamic-form`
- **Role**: Takes a declarative JSON configuration schema and generates the complete reactive form and UI layout dynamically!
- **Inputs**:
  - `schema`: `input.required<DynamicFormSchema>()`
- **Outputs**:
  - `formSubmit`: `output<any>()`
- **Schema Model**:
  ```typescript
  export interface DynamicFormField {
    name: string;
    type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'switch' | 'date' | 'file';
    label: string;
    placeholder?: string;
    hint?: string;
    defaultValue?: any;
    required?: boolean;
    validators?: {
      min?: number;
      max?: number;
      minLength?: number;
      maxLength?: number;
      email?: boolean;
      pattern?: string;
    };
    options?: { label: string; value: any; description?: string }[];
    gridCols?: 1 | 2 | 3;
    dependsOn?: {
      field: string;
      value: any;
    };
  }

  export interface DynamicFormSchema {
    title?: string;
    description?: string;
    submitText?: string;
    fields: DynamicFormField[];
  }
  ```

---

## 3. Centralized Validation & Error Translation Engine

Provide an injectable `FormErrorService` and an `InjectionToken` (`UI_FORM_ERROR_MESSAGES`) so applications can customize validation messages globally:

```typescript
export const DEFAULT_ERROR_MESSAGES: Record<string, (error: any, fieldName?: string) => string> = {
  required: (_, name) => `${name || 'This field'} is required.`,
  email: () => 'Please enter a valid email address.',
  minlength: (err, name) => `${name || 'Field'} must be at least ${err.requiredLength} characters (currently ${err.actualLength}).`,
  maxlength: (err, name) => `${name || 'Field'} cannot exceed ${err.requiredLength} characters.`,
  min: (err) => `Value must be at least ${err.min}.`,
  max: (err) => `Value cannot exceed ${err.max}.`,
  pattern: () => 'The value entered does not match the required format.',
  fileSize: (err) => `File exceeds the maximum size limit of ${err.maxSize}.`,
};
```

---

## 4. Showcase & Demo Site Architecture

The accompanying showcase site must be an interactive Angular application featuring:

1. **Interactive Demo Forms**:
   - **User Registration & Profile Form**: Compound layout with text inputs, password toggle, email, date of birth, bio textarea, terms checkbox, and newsletter switch.
   - **Job Application Form**: Demonstrating file upload (Resume/CV), select (Department, Role), experience radio group, portfolio URL, and dynamic skills tags.
   - **Schema-Driven Dynamic Form**: A live JSON editor where developers can edit the JSON schema and watch the form re-render in real time!
2. **Component Catalog / Documentation Explorer**:
   - A dedicated tab showcasing each component in isolation with interactive property controls (disabled, error state, required, size, variant) and copyable HTML snippets.
3. **Live Form State Inspector**:
   - Real-time reactive cards displaying:
     - `form.value` (formatted JSON)
     - `form.status` (`VALID` / `INVALID` / `PENDING`)
     - `form.dirty` / `form.touched` / `form.pristine`
     - Active field-by-field validation errors.

---

## 5. Verification Checklist

- [ ] All components are standalone and run cleanly under Angular 22+.
- [ ] No external UI framework (Material, Bootstrap, Tailwind) is required for core operation; pure CSS variables provide modern, beautiful aesthetics.
- [ ] Supports both Reactive Forms (`formGroup`, `formControlName`) and Signal-driven workflows.
- [ ] Zero TypeScript or template compiler warnings under strict mode.
- [ ] Complete keyboard navigation and accessible ARIA attributes across all controls.
