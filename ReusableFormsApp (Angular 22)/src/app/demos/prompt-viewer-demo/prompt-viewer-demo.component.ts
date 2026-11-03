import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

const MASTER_PROMPT_CONTENT = `# Master Prompt: Production-Grade Reusable Form Component Suite (Angular 22+ Signal Forms)

> **System Role**: Act as a **Principal Frontend Architect and Staff Angular Engineer**. Your task is to design, generate, and implement a **complete, zero-dependency, production-grade reusable form component suite** using **Angular 22 or above** powered natively by **Signal Forms** (\`@angular/forms/signals\`).
> 
> The suite must package both the **form container itself** (\`<ui-form>\`) and **all primary form elements** (\`<ui-input>\`, \`<ui-textarea>\`, \`<ui-select>\`, \`<ui-checkbox>\`, \`<ui-checkbox-group>\`, \`<ui-radio-group>\`, \`<ui-switch>\`, \`<ui-datepicker>\`, \`<ui-file-upload>\`, \`<ui-form-field>\`, and \`<ui-dynamic-form>\`) into cleanly decoupled, accessible, and themeable standalone components that can be dropped into **any** modern Angular application.

---

## 1. Architectural Foundations (Angular 22+ Signal Forms)

1. **Signal Forms Native**:
   - Built on \`@angular/forms/signals\` using \`form(model, schema)\`, \`FieldTree\`, and \`[formField]\` directives.
   - Zero boilerplate \`FormGroup\` or \`FormBuilder\` dependencies. Forms bind directly to model signals (\`model = signal({...})\`).
   - Async & synchronous validation via functional schema rules (\`required\`, \`email\`, \`minLength\`, \`maxLength\`, \`min\`, \`max\`, \`pattern\`).
   - Typed validation execution using \`submit(formTree, action)\` with automatic touched-marking and invalid field focusing.
2. **Signal-First Component Reactivity**:
   - Component inputs use \`input()\`, \`input.required()\`, and \`model()\`.
   - Boolean attributes use \`transform: booleanAttribute\` for clean bare attribute usage (\`<ui-input clearable required>\`).
   - Component events use \`output()\`.
   - Derived values use \`computed()\`.
3. **Universal Control Binding**:
   - Every input component binds with \`[formField]="form.fieldName"\` via \`FormField\` directive integration.
   - Also supports direct two-way Signal bindings (\`[(value)]="sig"\`) and template-driven \`[(ngModel)]\`.
4. **WCAG 2.2 AA Accessibility**:
   - Auto-generated unique IDs linking labels to inputs.
   - \`aria-invalid\` bound directly to \`field().invalid() && (field().touched() || field().dirty())\`.
   - Full keyboard navigation (Arrow keys for radio groups and custom dropdowns, Space/Enter for switches and file dropzones).
5. **Zero External CSS Framework**:
   - 100% scoped CSS variables (\--ui-form-primary\, \--ui-form-border\, \--ui-form-error\, etc.) with built-in Dark Mode.
6. **Clean Multi-File Separation of Concerns**:
   - Every component separates template and styling into dedicated files (\.component.html\ and \.component.css\) using \	emplateUrl\ and \styleUrl\.
   - Zero inline templates or inline style arrays in component decorators.
---

## 2. Component Specifications

- **<ui-form>**: Container accepting \`[form]="fieldTree"\`, running \`submit(form, action)\`, auto-scrolling to first invalid element, and rendering an accessible error summary banner from \`form().errors()\`.
- **<ui-form-field>**: Wrapper primitive with label, required asterisk, optional pill, hint text, and animated error messaging.
- **<ui-input>**: Text, email, password (with show/hide reveal toggle), number, search, clearable button.
- **<ui-textarea>**: Auto-resizing textarea with character counter.
- **<ui-select>**: Accessible custom dropdown with live search filter and keyboard support.
- **<ui-checkbox> & <ui-checkbox-group>**: Single check with indeterminate state and multi-select array groups.
- **<ui-radio-group>**: Circular or card-style options with keyboard navigation.
- **<ui-switch>**: Animated accessible toggle switch (\`role="switch"\`).
- **<ui-datepicker>**: Standard date input with quick offset presets (+Today, +7 Days, +30 Days).
- **<ui-file-upload>**: Drag & drop zone with file type filter, size limits, and removable preview chips.
- **<ui-dynamic-form>**: Dynamic JSON schema-driven engine that creates a model signal and builds a Signal Forms \`FieldTree\` dynamically!
`;

@Component({
  selector: 'app-prompt-viewer-demo',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './prompt-viewer-demo.component.html',
  styleUrl: './prompt-viewer-demo.component.css',
})
export class PromptViewerDemoComponent {
  promptText = MASTER_PROMPT_CONTENT;
  copied = signal<boolean>(false);

  copyPrompt(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.promptText);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2500);
    }
  }
}
