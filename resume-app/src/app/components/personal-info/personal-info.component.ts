import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInfo } from '../../services/resume.service';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="personal-info" id="personal-info">
      <div class="pi-inner">
        <div class="pi-avatar">
          <span class="pi-initials">{{ initials }}</span>
        </div>
        <div class="pi-content">
          <h1 class="pi-name">{{ data.name }}</h1>
          <p class="pi-title">{{ data.title }}</p>
          <div class="pi-contacts">
            <a class="pi-contact" [href]="'mailto:' + data.email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
              {{ data.email }}
            </a>
            <span class="pi-contact">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>
              {{ data.phone }}
            </span>
            <span class="pi-contact">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
              {{ data.location }}
            </span>
          </div>
          <div class="pi-links">
            <a class="pi-link" [href]="'https://' + data.linkedin" target="_blank">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <a class="pi-link" [href]="'https://' + data.github" target="_blank">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
            <a class="pi-link" [href]="'https://' + data.website" target="_blank">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3.157 7.582A8.959 8.959 0 003 12c0 .778.099 1.533.284 2.253"/></svg>
              {{ data.website }}
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .personal-info {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      overflow: hidden;
      position: relative;
    }
    .personal-info::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--accent), var(--accent-2));
    }
    .pi-inner {
      display: flex;
      align-items: center;
      gap: 2rem;
      padding: 2.5rem;
    }
    .pi-avatar {
      flex-shrink: 0;
      width: 88px; height: 88px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
      display: flex; align-items: center; justify-content: center;
    }
    .pi-initials {
      font-family: var(--font-display);
      font-size: 2rem;
      color: #fff;
      letter-spacing: -0.02em;
    }
    .pi-content { flex: 1; min-width: 0; }
    .pi-name {
      font-family: var(--font-display);
      font-size: 2.25rem;
      color: var(--text-primary);
      margin: 0 0 0.2rem;
      line-height: 1.1;
      letter-spacing: -0.02em;
    }
    .pi-title {
      font-size: 1rem;
      color: var(--accent);
      font-weight: 500;
      margin: 0 0 1.25rem;
      letter-spacing: 0.01em;
    }
    .pi-contacts {
      display: flex; flex-wrap: wrap; gap: 0.75rem 1.5rem;
      margin-bottom: 1rem;
    }
    .pi-contact {
      display: flex; align-items: center; gap: 0.4rem;
      font-size: 0.85rem; color: var(--text-secondary);
      text-decoration: none;
      transition: color 0.2s;
    }
    .pi-contact:hover { color: var(--accent); }
    .pi-contact svg { width: 14px; height: 14px; flex-shrink: 0; }
    .pi-links { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .pi-link {
      display: inline-flex; align-items: center; gap: 0.4rem;
      padding: 0.35rem 0.85rem;
      border: 1px solid var(--border);
      border-radius: 999px;
      font-size: 0.8rem; font-weight: 500;
      color: var(--text-secondary);
      text-decoration: none;
      background: var(--surface-2);
      transition: all 0.2s;
    }
    .pi-link:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-ghost); }
    .pi-link svg { width: 13px; height: 13px; }
    @media (max-width: 600px) {
      .pi-inner { flex-direction: column; align-items: flex-start; padding: 1.5rem; }
    }
  `]
})
export class PersonalInfoComponent {
  @Input() data!: PersonalInfo;
  get initials(): string {
    return this.data?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) ?? 'AR';
  }
}
