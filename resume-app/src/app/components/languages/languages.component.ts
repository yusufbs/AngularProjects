import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Language } from '../../services/resume.service';

@Component({
  selector: 'app-languages',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section-card" id="languages">
      <div class="section-header">
        <span class="section-icon">◌</span>
        <h2 class="section-title">Languages</h2>
      </div>
      <div class="lang-list">
        @for (lang of data; track lang.language) {
          <div class="lang-row">
            <span class="lang-name">{{ lang.language }}</span>
            <span class="lang-badge" [class]="proficiencyClass(lang.proficiency)">{{ lang.proficiency }}</span>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .lang-list { display: flex; flex-direction: column; gap: 0.65rem; }
    .lang-row {
      display: flex; justify-content: space-between; align-items: center;
      padding: 0.85rem 1.25rem;
      background: var(--surface-2);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      transition: border-color 0.15s;
    }
    .lang-row:hover { border-color: var(--accent); }
    .lang-name { font-size: 0.9rem; font-weight: 600; color: var(--text-primary); }
    .lang-badge {
      font-size: 0.75rem; font-weight: 600;
      padding: 0.2rem 0.75rem;
      border-radius: 999px;
      border: 1px solid;
    }
    .lang-badge.native { background: var(--accent-ghost); color: var(--accent); border-color: var(--accent); }
    .lang-badge.professional { background: rgba(99,102,241,0.08); color: #6366f1; border-color: #6366f1; }
    .lang-badge.conversational { background: rgba(245,158,11,0.08); color: #d97706; border-color: #d97706; }
    .lang-badge.beginner { background: var(--surface); color: var(--text-muted); border-color: var(--border); }
  `]
})
export class LanguagesComponent {
  @Input() data!: Language[];

  proficiencyClass(p: string): string {
    return p.toLowerCase().split(' ')[0];
  }
}
