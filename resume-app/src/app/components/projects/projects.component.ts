import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../services/resume.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section-card" id="projects">
      <div class="section-header">
        <span class="section-icon">⊹</span>
        <h2 class="section-title">Projects</h2>
      </div>
      <div class="proj-grid">
        @for (proj of data; track proj.name) {
          <div class="proj-card">
            <div class="proj-header">
              <h3 class="proj-name">{{ proj.name }}</h3>
              <a class="proj-link" [href]="'https://' + proj.url" target="_blank">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              </a>
            </div>
            <p class="proj-desc">{{ proj.description }}</p>
            <div class="proj-tech">
              @for (t of proj.tech; track t) {
                <span class="tech-badge">{{ t }}</span>
              }
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .proj-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1rem;
    }
    .proj-card {
      padding: 1.25rem;
      background: var(--surface-2);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      display: flex; flex-direction: column; gap: 0.75rem;
      transition: all 0.2s;
    }
    .proj-card:hover { border-color: var(--accent); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
    .proj-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .proj-name { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin: 0; }
    .proj-link {
      display: flex; align-items: center;
      color: var(--text-muted); text-decoration: none;
      transition: color 0.15s;
    }
    .proj-link:hover { color: var(--accent); }
    .proj-link svg { width: 15px; height: 15px; }
    .proj-desc { font-size: 0.825rem; color: var(--text-muted); line-height: 1.65; margin: 0; flex: 1; }
    .proj-tech { display: flex; flex-wrap: wrap; gap: 0.35rem; }
    .tech-badge {
      padding: 0.15rem 0.55rem;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 999px;
      font-size: 0.72rem; font-weight: 500;
      color: var(--accent);
    }
  `]
})
export class ProjectsComponent {
  @Input() data!: Project[];
}
