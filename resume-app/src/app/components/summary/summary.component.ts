import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary',
  standalone: true,
  template: `
    <section class="section-card" id="summary">
      <div class="section-header">
        <span class="section-icon">✦</span>
        <h2 class="section-title">Summary</h2>
      </div>
      <p class="summary-text">{{ data }}</p>
    </section>
  `,
  styles: [`
    .summary-text {
      font-size: 1.05rem;
      line-height: 1.8;
      color: var(--text-secondary);
      margin: 0;
      border-left: 3px solid var(--accent);
      padding-left: 1.25rem;
    }
  `]
})
export class SummaryComponent {
  @Input() data!: string;
}
