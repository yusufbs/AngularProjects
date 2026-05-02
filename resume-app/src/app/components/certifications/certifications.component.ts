import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Certification } from '../../services/resume.service';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section-card" id="certifications">
      <div class="section-header">
        <span class="section-icon">⬡</span>
        <h2 class="section-title">Certifications</h2>
      </div>
      <div class="cert-list">
        @for (cert of data; track cert.credentialId) {
          <div class="cert-row">
            <div class="cert-badge">✓</div>
            <div class="cert-info">
              <h3 class="cert-name">{{ cert.name }}</h3>
              <span class="cert-issuer">{{ cert.issuer }}</span>
            </div>
            <div class="cert-right">
              <span class="cert-year">{{ cert.year }}</span>
              <span class="cert-id">{{ cert.credentialId }}</span>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .cert-list { display: flex; flex-direction: column; gap: 0.75rem; }
    .cert-row {
      display: flex; align-items: center; gap: 1rem;
      padding: 1rem 1.25rem;
      background: var(--surface-2);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      transition: all 0.15s;
    }
    .cert-row:hover { border-color: var(--accent); }
    .cert-badge {
      width: 36px; height: 36px; border-radius: 50%;
      background: var(--accent-ghost);
      border: 1.5px solid var(--accent);
      color: var(--accent);
      font-size: 1rem; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .cert-info { flex: 1; min-width: 0; }
    .cert-name { font-size: 0.9rem; font-weight: 600; color: var(--text-primary); margin: 0 0 0.15rem; }
    .cert-issuer { font-size: 0.78rem; color: var(--text-muted); }
    .cert-right { display: flex; flex-direction: column; align-items: flex-end; gap: 0.2rem; flex-shrink: 0; }
    .cert-year { font-size: 0.85rem; font-weight: 600; color: var(--text-primary); }
    .cert-id { font-size: 0.7rem; color: var(--text-muted); font-family: monospace; }
  `]
})
export class CertificationsComponent {
  @Input() data!: Certification[];
}
