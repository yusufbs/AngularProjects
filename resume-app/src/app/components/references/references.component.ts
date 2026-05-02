import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reference } from '../../services/resume.service';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section-card" id="references">
      <div class="section-header">
        <span class="section-icon">◫</span>
        <h2 class="section-title">References</h2>
      </div>
      <div class="ref-grid">
        @for (ref of data; track ref.email) {
          <div class="ref-card">
            <div class="ref-avatar">{{ initials(ref.name) }}</div>
            <div class="ref-info">
              <h3 class="ref-name">{{ ref.name }}</h3>
              <p class="ref-title">{{ ref.title }}</p>
              <p class="ref-relationship">{{ ref.relationship }}</p>
              <div class="ref-contacts">
                <a [href]="'mailto:' + ref.email" class="ref-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
                  {{ ref.email }}
                </a>
                <span class="ref-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>
                  {{ ref.phone }}
                </span>
              </div>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .ref-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1rem;
    }
    .ref-card {
      display: flex; gap: 1rem;
      padding: 1.25rem;
      background: var(--surface-2);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      transition: all 0.2s;
    }
    .ref-card:hover { border-color: var(--accent); }
    .ref-avatar {
      width: 44px; height: 44px; border-radius: 50%;
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
      color: #fff;
      font-family: var(--font-display);
      font-size: 1rem;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .ref-info { flex: 1; min-width: 0; }
    .ref-name { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin: 0 0 0.15rem; }
    .ref-title { font-size: 0.8rem; color: var(--accent); font-weight: 500; margin: 0 0 0.1rem; }
    .ref-relationship { font-size: 0.75rem; color: var(--text-muted); margin: 0 0 0.65rem; font-style: italic; }
    .ref-contacts { display: flex; flex-direction: column; gap: 0.3rem; }
    .ref-link {
      display: flex; align-items: center; gap: 0.35rem;
      font-size: 0.775rem; color: var(--text-muted);
      text-decoration: none; transition: color 0.15s;
    }
    .ref-link:hover { color: var(--accent); }
    .ref-link svg { width: 12px; height: 12px; flex-shrink: 0; }
  `]
})
export class ReferencesComponent {
  @Input() data!: Reference[];

  initials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2);
  }
}
