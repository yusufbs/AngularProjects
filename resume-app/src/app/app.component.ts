import { Component, OnInit, OnDestroy, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeService, ResumeData } from './services/resume.service';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { SummaryComponent } from './components/summary/summary.component';
import { TechnicalSkillsComponent } from './components/technical-skills/technical-skills.component';
import { CoreCompetenciesComponent } from './components/core-competencies/core-competencies.component';
import { ProfessionalExperienceComponent } from './components/professional-experience/professional-experience.component';
import { EducationComponent } from './components/education/education.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { CertificationsComponent } from './components/certifications/certifications.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { AvailabilityComponent } from './components/availability/availability.component';
import { EmploymentGapsComponent } from './components/employment-gaps/employment-gaps.component';
import { ReferencesComponent } from './components/references/references.component';
import { Subscription } from 'rxjs';

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    PersonalInfoComponent,
    SummaryComponent,
    TechnicalSkillsComponent,
    CoreCompetenciesComponent,
    ProfessionalExperienceComponent,
    EducationComponent,
    AchievementsComponent,
    CertificationsComponent,
    ProjectsComponent,
    LanguagesComponent,
    AvailabilityComponent,
    EmploymentGapsComponent,
    ReferencesComponent,
  ],
  template: `
    <!-- Top bar (mobile) -->
    <header class="topbar">
      <button class="menu-btn" (click)="sidebarOpen = !sidebarOpen" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
      <span class="topbar-name">{{ resume?.personalInfo?.name ?? 'Resume' }}</span>
      <span class="topbar-title">{{ resume?.personalInfo?.title ?? '' }}</span>
    </header>

    <!-- Sidebar overlay (mobile) -->
    @if (sidebarOpen) {
      <div class="overlay" (click)="sidebarOpen = false"></div>
    }

    <div class="app-shell">
      <!-- Sidebar -->
      <aside class="sidebar" [class.open]="sidebarOpen">
        <div class="sidebar-brand">
          <div class="brand-dot"></div>
          <span class="brand-label">Resume</span>
        </div>
        <nav class="sidebar-nav">
          @for (item of navItems; track item.id) {
            <a
              class="nav-item"
              [class.active]="activeSection === item.id"
              (click)="scrollTo(item.id)"
              href="javascript:void(0)"
            >
              <span class="nav-icon">{{ item.icon }}</span>
              <span class="nav-label">{{ item.label }}</span>
            </a>
          }
        </nav>
        <div class="sidebar-footer">
          <span>Angular 21</span>
        </div>
      </aside>

      <!-- Main content -->
      <main class="main-content">
        @if (loading) {
          <div class="loader">
            <div class="loader-ring"></div>
            <p>Loading resume…</p>
          </div>
        } @else if (error) {
          <div class="error-state">
            <span class="error-icon">⚠</span>
            <p>{{ error }}</p>
          </div>
        } @else if (resume) {
          <div class="sections-stack">
            <app-personal-info [data]="resume.personalInfo" />
            <app-summary [data]="resume.summary" />
            <app-technical-skills [data]="resume.technicalSkills" />
            <app-core-competencies [data]="resume.coreCompetencies" />
            <app-professional-experience [data]="resume.professionalExperience" />
            <app-education [data]="resume.education" />
            <app-achievements [data]="resume.achievements" />
            <app-certifications [data]="resume.certifications" />
            <app-projects [data]="resume.projects" />
            <app-languages [data]="resume.languages" />
            <app-availability [data]="resume.availability" />
            <app-employment-gaps [data]="resume.employmentGaps" />
            <app-references [data]="resume.references" />
          </div>
        }
      </main>
    </div>
  `,
  styles: [`
    .topbar {
      display: none;
      position: fixed; top: 0; left: 0; right: 0; z-index: 200;
      height: var(--topbar-h);
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      align-items: center;
      padding: 0 1rem;
      gap: 0.75rem;
    }
    .menu-btn {
      background: none; border: none; cursor: pointer;
      display: flex; flex-direction: column; gap: 5px; padding: 4px;
    }
    .menu-btn span {
      display: block; width: 20px; height: 2px;
      background: var(--text-secondary); border-radius: 2px;
    }
    .topbar-name { font-family: var(--font-display); font-size: 1rem; color: var(--text-primary); }
    .topbar-title { font-size: 0.75rem; color: var(--text-muted); margin-left: auto; }

    .app-shell { display: flex; min-height: 100vh; }

    .sidebar {
      width: var(--sidebar-w);
      min-height: 100vh;
      background: var(--surface);
      border-right: 1px solid var(--border);
      display: flex; flex-direction: column;
      position: sticky; top: 0; height: 100vh;
      overflow-y: auto; flex-shrink: 0;
    }
    .sidebar-brand {
      display: flex; align-items: center; gap: 0.6rem;
      padding: 1.5rem 1.25rem 1rem;
      border-bottom: 1px solid var(--border);
    }
    .brand-dot {
      width: 10px; height: 10px; border-radius: 50%;
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
    }
    .brand-label { font-family: var(--font-display); font-size: 1.05rem; color: var(--text-primary); }
    .sidebar-nav { flex: 1; padding: 0.75rem 0.625rem; display: flex; flex-direction: column; gap: 2px; }
    .nav-item {
      display: flex; align-items: center; gap: 0.6rem;
      padding: 0.55rem 0.75rem; border-radius: 8px;
      color: var(--text-muted); text-decoration: none;
      font-size: 0.83rem; font-weight: 500; transition: all 0.15s; cursor: pointer;
    }
    .nav-item:hover { background: var(--surface-2); color: var(--text-secondary); }
    .nav-item.active { background: var(--accent-ghost); color: var(--accent); }
    .nav-icon { font-size: 0.85rem; width: 16px; text-align: center; flex-shrink: 0; }
    .nav-label { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .sidebar-footer { padding: 0.75rem 1.25rem; border-top: 1px solid var(--border); font-size: 0.7rem; color: var(--text-muted); }

    .main-content { flex: 1; min-width: 0; padding: 2rem; max-width: 900px; }
    .sections-stack { display: flex; flex-direction: column; gap: 1.5rem; }

    .loader {
      display: flex; flex-direction: column; align-items: center;
      justify-content: center; gap: 1rem;
      min-height: 60vh; color: var(--text-muted); font-size: 0.9rem;
    }
    .loader-ring {
      width: 40px; height: 40px; border-radius: 50%;
      border: 3px solid var(--border); border-top-color: var(--accent);
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .error-state { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.75rem; min-height: 60vh; color: #f87171; }
    .error-icon { font-size: 2rem; }

    .overlay { position: fixed; inset: 0; z-index: 150; background: rgba(0,0,0,0.6); backdrop-filter: blur(2px); }

    @media (max-width: 768px) {
      .topbar { display: flex; }
      .app-shell { padding-top: var(--topbar-h); }
      .sidebar { position: fixed; top: 0; left: 0; z-index: 160; height: 100vh; transform: translateX(-100%); transition: transform 0.25s ease; }
      .sidebar.open { transform: translateX(0); }
      .main-content { padding: 1.25rem; }
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  private resumeService = inject(ResumeService);
  private sub?: Subscription;

  resume: ResumeData | null = null;
  loading = true;
  error: string | null = null;
  sidebarOpen = false;
  activeSection = 'personal-info';

  navItems: NavItem[] = [
    { id: 'personal-info',           label: 'Personal Info',     icon: '◉' },
    { id: 'summary',                 label: 'Summary',           icon: '✦' },
    { id: 'technical-skills',        label: 'Tech Skills',       icon: '⌨' },
    { id: 'core-competencies',       label: 'Competencies',      icon: '◈' },
    { id: 'professional-experience', label: 'Experience',        icon: '◎' },
    { id: 'education',               label: 'Education',         icon: '◒' },
    { id: 'achievements',            label: 'Achievements',      icon: '★' },
    { id: 'certifications',          label: 'Certifications',    icon: '⬡' },
    { id: 'projects',                label: 'Projects',          icon: '⊹' },
    { id: 'languages',               label: 'Languages',         icon: '◌' },
    { id: 'availability',            label: 'Availability',      icon: '◐' },
    { id: 'employment-gaps',         label: 'Gaps',              icon: '⊘' },
    { id: 'references',              label: 'References',        icon: '◫' },
  ];

  ngOnInit(): void {
    this.sub = this.resumeService.getResume().subscribe({
      next: data => { this.resume = data; this.loading = false; },
      error: err => { this.error = 'Failed to load resume.json — ' + err.message; this.loading = false; }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  scrollTo(id: string): void {
    this.activeSection = id;
    this.sidebarOpen = false;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const ids = this.navItems.map(n => n.id);
    for (let i = ids.length - 1; i >= 0; i--) {
      const rect = document.getElementById(ids[i])?.getBoundingClientRect();
      if (rect && rect.top <= 120) { this.activeSection = ids[i]; return; }
    }
    this.activeSection = ids[0];
  }
}
