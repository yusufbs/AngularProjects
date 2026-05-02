import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../services/resume.service';

@Component({
  selector: 'app-professional-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section-card" id="professional-experience">
      <div class="section-header">
        <span class="section-icon">◉</span>
        <h2 class="section-title">Professional Experience</h2>
      </div>
      <div class="exp-list">
        @for (exp of data; track exp.company; let last = $last) {
          <div class="exp-item" [class.last]="last">
            <div class="exp-timeline">
              <div class="exp-dot"></div>
              @if (!last) { <div class="exp-line"></div> }
            </div>
            <div class="exp-body">
              <div class="exp-header">
                <div>
                  <h3 class="exp-role">{{ exp.role }}</h3>
                  <span class="exp-company">{{ exp.company }}</span>
                  <span class="exp-location"> · {{ exp.location }}</span>
                </div>
                <span class="exp-dates">{{ exp.startDate }} — {{ exp.endDate }}</span>
              </div>
              <ul class="exp-highlights">
                @for (h of exp.highlights; track h) {
                  <li>{{ h }}</li>
                }
              </ul>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .exp-list { display: flex; flex-direction: column; gap: 0; }
    .exp-item { display: flex; gap: 1.25rem; }
    .exp-timeline {
      display: flex; flex-direction: column; align-items: center;
      flex-shrink: 0; width: 20px;
    }
    .exp-dot {
      width: 12px; height: 12px; border-radius: 50%;
      background: var(--accent);
      border: 2px solid var(--surface);
      outline: 2px solid var(--accent);
      flex-shrink: 0;
      margin-top: 4px;
    }
    .exp-line {
      width: 2px; flex: 1;
      background: linear-gradient(to bottom, var(--accent), var(--border));
      margin: 6px 0;
      min-height: 24px;
    }
    .exp-body {
      flex: 1; padding-bottom: 2.25rem;
    }
    .exp-item.last .exp-body { padding-bottom: 0; }
    .exp-header {
      display: flex; justify-content: space-between;
      align-items: flex-start; flex-wrap: wrap; gap: 0.5rem;
      margin-bottom: 0.85rem;
    }
    .exp-role {
      font-family: var(--font-display);
      font-size: 1.15rem;
      color: var(--text-primary); margin: 0 0 0.15rem;
    }
    .exp-company { font-size: 0.875rem; font-weight: 600; color: var(--accent); }
    .exp-location { font-size: 0.875rem; color: var(--text-muted); }
    .exp-dates {
      font-size: 0.78rem; font-weight: 500;
      color: var(--text-muted);
      background: var(--surface-2);
      border: 1px solid var(--border);
      border-radius: 999px;
      padding: 0.2rem 0.75rem;
      white-space: nowrap;
    }
    .exp-highlights {
      list-style: none; padding: 0; margin: 0;
      display: flex; flex-direction: column; gap: 0.5rem;
    }
    .exp-highlights li {
      font-size: 0.875rem; color: var(--text-secondary); line-height: 1.65;
      padding-left: 1rem; position: relative;
    }
    .exp-highlights li::before {
      content: '→';
      position: absolute; left: 0;
      color: var(--accent); font-size: 0.75rem;
      top: 2px;
    }
  `]
})
export class ProfessionalExperienceComponent {
  @Input() data!: Experience[];
}
