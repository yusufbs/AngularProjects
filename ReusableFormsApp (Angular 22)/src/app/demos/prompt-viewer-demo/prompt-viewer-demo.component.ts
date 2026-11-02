import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

const MASTER_PROMPT_CONTENT = `# Master Prompt: Production-Grade Reusable Form Component Suite (Angular 22+)

> **System Role**: Act as a **Principal Frontend Architect and Staff Angular Engineer**. Your task is to design, generate, and implement a **complete, zero-dependency, production-grade reusable form component suite** using **Angular 22 or above**.
> 
> The suite must package both the **form container itself** (\`<ui-form>\`) and **all primary form elements** (\`<ui-input>\`, \`<ui-textarea>\`, \`<ui-select>\`, \`<ui-checkbox>\`, \`<ui-checkbox-group>\`, \`<ui-radio-group>\`, \`<ui-switch>\`, \`<ui-datepicker>\`, \`<ui-file-upload>\`, \`<ui-form-field>\`, and \`<ui-dynamic-form>\`) into cleanly decoupled, accessible, and themeable standalone components that can be dropped into **any** modern Angular application.

---

## 1. Architectural Foundations (Angular 22+ Standards)

1. **Standalone & Modern Control Flow**: Every component is standalone and uses modern \`@if\`, \`@for\`, \`@switch\`.
2. **Signal-First Reactivity**: Built using \`input()\`, \`input.required()\`, \`output()\`, \`model()\`, and \`computed()\`.
3. **Seamless ControlValueAccessor**: Implements \`ControlValueAccessor\` via self-injected \`NgControl\` or \`NG_VALUE_ACCESSOR\` for seamless binding with \`formControlName\`, \`[formControl]\`, or \`[(ngModel)]\`.
4. **WCAG 2.2 AA Accessibility**: Full ARIA markup (\`aria-invalid\`, \`aria-describedby\`, \`aria-required\`), auto-generated IDs, keyboard navigation.
5. **Zero External CSS Framework**: 100% scoped CSS variables (\`--ui-form-primary\`, \`--ui-form-border\`, etc.) with dark mode readiness.

---

## 2. Component Specifications

- **<ui-form>**: Container with submit/reset hooks, validation scroll-to-first-error, and error summary banner.
- **<ui-form-field>**: Wrapper primitive with label, required star, hint, and error animation.
- **<ui-input>**: Text, email, password (with reveal toggle), number, search, and clearable support.
- **<ui-textarea>**: Auto-resizing textarea with character counter.
- **<ui-select>**: Accessible dropdown with live search filter, options, and keyboard support.
- **<ui-checkbox> & <ui-checkbox-group>**: Single check with indeterminate state and multi-select array groups.
- **<ui-radio-group>**: Circular or card-style options with keyboard navigation.
- **<ui-switch>**: Animated accessible toggle switch.
- **<ui-datepicker>**: Standard date input with quick offset presets (+Today, +7 Days, +30 Days).
- **<ui-file-upload>**: Drag & drop zone with file type filter, size limits, and removable preview chips.
- **<ui-dynamic-form>**: JSON schema-driven engine with automatic form generation and \`dependsOn\` conditional visibility.
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
          <h2 class="viewer-title">Master Prompt & Architectural Spec</h2>
          <p class="viewer-desc">
            This is the exact prompt engineered to generate this reusable form library in any Angular 22+ codebase.
          </p>
        </div>
        <button
          type="button"
          class="copy-btn"
          [class.copied]="copied()"
          (click)="copyPrompt()"
        >
          @if (copied()) {
            <span>Copied to Clipboard! ✓</span>
          } @else {
            <span>Copy Full Prompt 📋</span>
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
