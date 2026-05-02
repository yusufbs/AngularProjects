import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmploymentGap } from '../../services/resume.service';

@Component({
  selector: 'app-employment-gaps',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section-card" id="employment-gaps">
      <div class="section-header">
        <span class="section-icon">⊘</span>
        <h2 class="section-title">Employment Gaps</h2>
      </div>
      @if (!data || data.length === 0) {
        <p class="no-gaps">No employment gaps to report.</p>
      } @else {
        <div class="gap-list">
          @for (gap of data; track gap.startDate) {
            <div class="gap-card">
              <div class="gap-period">
                <span class="gap-dates">{{ gap.startDate }} — {{ gap.endDate }}</span>
                <span class="gap-reason">{{ gap.reason }}</span>
              </div>
              <p class="gap-desc">{{ gap.description }}</p>
            </div>
          }
        </div>
      }
    </section>
  `,
  styles: [`
    .no-gaps { font-size: 0.875rem; color: var(--text-muted); margin: 0; }
    .gap-list { display: flex; flex-direction: column; gap: 1rem; }
    .gap-card {
      padding: 1.25rem;
      background: var(--surface-2);
      border: 1px solid var(--border);
      border-left: 3px solid var(--accent-2);
      border-radius: var(--radius);
    }
    .gap-period {
      display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;
      margin-bottom: 0.6rem;
    }
    .gap-dates { font-size: 0.85rem; font-weight: 600; color: var(--text-primary); }
    .gap-reason {
      font-size: 0.75rem; font-weight: 600;
      background: var(--accent-ghost);
      color: var(--accent);
      border: 1px solid var(--accent);
      border-radius: 999px;
      padding: 0.15rem 0.6rem;
    }
    .gap-desc { font-size: 0.85rem; color: var(--text-muted); line-height: 1.65; margin: 0; }
  `]
})
export class EmploymentGapsComponent {
  @Input() data!: EmploymentGap[];
}
