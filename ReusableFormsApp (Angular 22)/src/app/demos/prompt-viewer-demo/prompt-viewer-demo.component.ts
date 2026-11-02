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
   - 100% scoped CSS variables (\`--ui-form-primary\`, \`--ui-form-border\`, \`--ui-form-error\`, etc.) with built-in Dark Mode.

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
  template: `
    <div class="prompt-viewer-card">
      <div class="viewer-header">
        <div>
          <div class="tag-row">
            <span class="signal-badge">? Angular 22 Signal Forms Specification</span>
          </div>
          <h2 class="viewer-title">Master Prompt & Architectural Spec</h2>
          <p class="viewer-desc">
            This is the exact prompt engineered to generate this reusable form library in any Angular 22+ codebase using <code>@angular/forms/signals</code>.
          </p>
        </div>
        <button
          type="button"
          class="copy-btn"
          [class.copied]="copied()"
          (click)="copyPrompt()"
        >
          @if (copied()) {
            <span>Copied to Clipboard! ?</span>
          } @else {
            <span>Copy Full Prompt ??</span>
          }
        </button>
      </div>

      <div class="prompt-content-box">
        <pre class="prompt-text"><code>{{ promptText }}</code></pre>
      </div>
    </div>
  `,
  styles: [`
    .prompt-viewer-card {
      background: var(--ui-form-bg, #ffffff);
      border: 1px solid var(--ui-form-border, #e5e7eb);
      border-radius: var(--ui-form-radius-lg, 12px);
      padding: 1.75rem;
      box-shadow: var(--ui-form-shadow-sm, 0 1px 3px rgba(0,0,0,0.05));
    }

    .viewer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 1.25rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--ui-form-border, #f3f4f6);
    }

    .tag-row {
      margin-bottom: 0.35rem;
    }

    .signal-badge {
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

    .viewer-title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--ui-form-text, #111827);
    }

    .viewer-desc {
      margin: 0.35rem 0 0 0;
      font-size: 0.875rem;
      color: var(--ui-form-text-muted, #6b7280);
    }

    .copy-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--ui-form-primary, #4f46e5);
      color: #ffffff;
      border: none;
      border-radius: var(--ui-form-radius, 8px);
      padding: 0.625rem 1.25rem;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s ease;
      white-space: nowrap;
    }

    .copy-btn:hover {
      background: var(--ui-form-primary-hover, #4338ca);
    }

    .copy-btn.copied {
      background: var(--ui-form-success, #10b981);
    }

    .prompt-content-box {
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: var(--ui-form-radius, 8px);
      padding: 1.25rem;
      max-height: 38rem;
      overflow-y: auto;
    }

    .prompt-text {
      margin: 0;
      color: #e2e8f0;
      font-family: var(--font-mono, monospace);
      font-size: 0.825rem;
      line-height: 1.6;
      white-space: pre-wrap;
    }
  `],
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
