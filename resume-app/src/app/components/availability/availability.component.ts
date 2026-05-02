import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Availability } from '../../services/resume.service';

@Component({
  selector: 'app-availability',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section-card" id="availability">
      <div class="section-header">
        <span class="section-icon">◐</span>
        <h2 class="section-title">Availability</h2>
      </div>
      <div class="avail-body">
        <div class="avail-status">
          <span class="status-dot"></span>
          <span class="status-text">{{ data.status }}</span>
        </div>
        <div class="avail-grid">
          <div class="avail-block">
            <span class="avail-label">Start Date</span>
            <span class="avail-value">{{ data.startDate }}</span>
          </div>
          <div class="avail-block">
            <span class="avail-label">Notice Period</span>
            <span class="avail-value">{{ data.noticePeriod }}</span>
          </div>
          <div class="avail-block wide">
            <span class="avail-label">Preferred Roles</span>
            <div class="avail-tags">
              @for (role of data.preferredRoles; track role) {
                <span class="avail-tag accent">{{ role }}</span>
              }
            </div>
          </div>
          <div class="avail-block wide">
            <span class="avail-label">Work Type</span>
            <div class="avail-tags">
              @for (type of data.workType; track type) {
                <span class="avail-tag">{{ type }}</span>
              }
            </div>
          </div>
          <div class="avail-block wide">
            <span class="avail-label">Preferred Locations</span>
            <div class="avail-tags">
              @for (loc of data.locations; track loc) {
                <span class="avail-tag">{{ loc }}</span>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .avail-body { display: flex; flex-direction: column; gap: 1.25rem; }
    .avail-status {
      display: inline-flex; align-items: center; gap: 0.6rem;
      padding: 0.55rem 1.1rem;
      background: rgba(34,197,94,0.08);
      border: 1px solid rgba(34,197,94,0.3);
      border-radius: 999px;
      align-self: flex-start;
    }
    .status-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: #22c55e;
      box-shadow: 0 0 0 3px rgba(34,197,94,0.2);
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.2); }
      50% { box-shadow: 0 0 0 6px rgba(34,197,94,0.08); }
    }
    .status-text { font-size: 0.85rem; font-weight: 600; color: #16a34a; }
    .avail-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }
    .avail-block { display: flex; flex-direction: column; gap: 0.4rem; }
    .avail-block.wide { grid-column: 1 / -1; }
    .avail-label {
      font-size: 0.72rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.08em;
      color: var(--text-muted);
    }
    .avail-value { font-size: 0.9rem; font-weight: 600; color: var(--text-primary); }
    .avail-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
    .avail-tag {
      padding: 0.2rem 0.7rem;
      background: var(--surface-2);
      border: 1px solid var(--border);
      border-radius: 999px;
      font-size: 0.8rem; color: var(--text-secondary);
    }
    .avail-tag.accent {
      background: var(--accent-ghost);
      border-color: var(--accent);
      color: var(--accent);
      font-weight: 500;
    }
  `]
})
export class AvailabilityComponent {
  @Input() data!: Availability;
}
