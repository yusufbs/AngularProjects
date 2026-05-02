import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-core-competencies',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section-card" id="core-competencies">
      <div class="section-header">
        <span class="section-icon">◈</span>
        <h2 class="section-title">Core Competencies</h2>
      </div>
      <div class="competencies-grid">
        @for (item of data; track item; let i = $index) {
          <div class="competency-item">
            <span class="comp-num">{{ (i + 1).toString().padStart(2, '0') }}</span>
            <span class="comp-text">{{ item }}</span>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .competencies-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 0.6rem;
    }
    .competency-item {
      display: flex; align-items: center; gap: 0.75rem;
      padding: 0.75rem 1rem;
      background: var(--surface-2);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      transition: all 0.15s;
    }
    .competency-item:hover { border-color: var(--accent); transform: translateX(2px); }
    .comp-num {
      font-size: 0.7rem; font-weight: 700;
      color: var(--accent);
      font-variant-numeric: tabular-nums;
      flex-shrink: 0;
    }
    .comp-text { font-size: 0.875rem; color: var(--text-primary); font-weight: 500; }
  `]
})
export class CoreCompetenciesComponent {
  @Input() data!: string[];
}
