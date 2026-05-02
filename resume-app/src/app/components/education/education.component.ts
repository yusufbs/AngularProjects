import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Education } from '../../services/resume.service';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section-card" id="education">
      <div class="section-header">
        <span class="section-icon">◎</span>
        <h2 class="section-title">Education</h2>
      </div>
      <div class="edu-list">
        @for (edu of data; track edu.institution) {
          <div class="edu-card">
            <div class="edu-top">
              <div>
                <h3 class="edu-degree">{{ edu.degree }}</h3>
                <p class="edu-inst">{{ edu.institution }}</p>
                <p class="edu-focus">Focus: {{ edu.focus }}</p>
              </div>
              <div class="edu-meta">
                <span class="edu-year">{{ edu.graduationYear }}</span>
                <span class="edu-gpa">GPA {{ edu.gpa }}</span>
                @if (edu.honors) {
                  <span class="edu-honors">{{ edu.honors }}</span>
                }
              </div>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .edu-list { display: flex; flex-direction: column; gap: 1rem; }
    .edu-card {
      padding: 1.25rem 1.5rem;
      background: var(--surface-2);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      transition: border-color 0.2s;
    }
    .edu-card:hover { border-color: var(--accent); }
    .edu-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap; }
    .edu-degree {
      font-family: var(--font-display);
      font-size: 1.1rem; color: var(--text-primary);
      margin: 0 0 0.2rem;
    }
    .edu-inst { font-size: 0.875rem; font-weight: 600; color: var(--accent); margin: 0 0 0.2rem; }
    .edu-focus { font-size: 0.825rem; color: var(--text-muted); margin: 0; }
    .edu-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 0.35rem; }
    .edu-year {
      font-size: 0.875rem; font-weight: 600; color: var(--text-primary);
    }
    .edu-gpa {
      font-size: 0.775rem;
      background: var(--accent-ghost);
      color: var(--accent);
      border: 1px solid var(--accent);
      border-radius: 999px;
      padding: 0.15rem 0.6rem;
      font-weight: 600;
    }
    .edu-honors {
      font-size: 0.75rem; color: var(--text-muted);
      font-style: italic;
    }
  `]
})
export class EducationComponent {
  @Input() data!: Education[];
}
