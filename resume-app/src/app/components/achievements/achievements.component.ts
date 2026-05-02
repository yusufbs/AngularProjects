import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Achievement } from '../../services/resume.service';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section-card" id="achievements">
      <div class="section-header">
        <span class="section-icon">★</span>
        <h2 class="section-title">Achievements</h2>
      </div>
      <div class="ach-grid">
        @for (ach of data; track ach.title) {
          <div class="ach-card">
            <span class="ach-year">{{ ach.year }}</span>
            <h3 class="ach-title">{{ ach.title }}</h3>
            <p class="ach-desc">{{ ach.description }}</p>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .ach-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 1rem;
    }
    .ach-card {
      padding: 1.25rem;
      background: var(--surface-2);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      position: relative;
      overflow: hidden;
      transition: all 0.2s;
    }
    .ach-card::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0; height: 3px;
      background: linear-gradient(90deg, var(--accent), var(--accent-2));
      opacity: 0;
      transition: opacity 0.2s;
    }
    .ach-card:hover { border-color: var(--accent); transform: translateY(-2px); }
    .ach-card:hover::before { opacity: 1; }
    .ach-year {
      font-size: 0.7rem; font-weight: 700;
      color: var(--accent); text-transform: uppercase;
      letter-spacing: 0.08em; display: block; margin-bottom: 0.5rem;
    }
    .ach-title {
      font-size: 0.95rem; font-weight: 600;
      color: var(--text-primary); margin: 0 0 0.5rem;
    }
    .ach-desc { font-size: 0.825rem; color: var(--text-muted); line-height: 1.6; margin: 0; }
  `]
})
export class AchievementsComponent {
  @Input() data!: Achievement[];
}
