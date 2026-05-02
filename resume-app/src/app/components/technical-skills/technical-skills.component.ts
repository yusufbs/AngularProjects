import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnicalSkills } from '../../services/resume.service';

@Component({
  selector: 'app-technical-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section-card" id="technical-skills">
      <div class="section-header">
        <span class="section-icon">⌨</span>
        <h2 class="section-title">Technical Skills</h2>
      </div>
      <div class="skills-grid">
        @for (category of categories; track category) {
          <div class="skill-category">
            <h3 class="skill-cat-title">{{ category }}</h3>
            <div class="skill-tags">
              @for (skill of data[category]; track skill) {
                <span class="skill-tag">{{ skill }}</span>
              }
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 1.5rem;
    }
    .skill-category {
      background: var(--surface-2);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 1.1rem 1.25rem;
    }
    .skill-cat-title {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--accent);
      margin: 0 0 0.75rem;
    }
    .skill-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
    .skill-tag {
      padding: 0.2rem 0.65rem;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 999px;
      font-size: 0.8rem;
      color: var(--text-secondary);
      transition: all 0.15s;
    }
    .skill-tag:hover { border-color: var(--accent); color: var(--accent); }
  `]
})
export class TechnicalSkillsComponent {
  @Input() data!: TechnicalSkills;
  get categories(): string[] {
    return this.data ? Object.keys(this.data) : [];
  }
}
