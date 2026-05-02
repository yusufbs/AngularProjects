import { Component, HostListener, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { Resume, ResumeData } from './services/resume';

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  private resumeService = inject(Resume);
  private sub?: Subscription;

  resume: ResumeData | null = null;
  loading = true;
  error: string | null = null;
  sidebarOpen = false;
  activeSection = 'personal-info';

  navItems: NavItem[] = [
    { id: 'personal-info', label: 'Personal Info', icon: '◉' },
    { id: 'summary', label: 'Summary', icon: '✦' },
    { id: 'technical-skills', label: 'Tech Skills', icon: '⌨' },
    { id: 'core-competencies', label: 'Competencies', icon: '◈' },
    { id: 'professional-experience', label: 'Experience', icon: '◎' },
    { id: 'education', label: 'Education', icon: '◒' },
    { id: 'achievements', label: 'Achievements', icon: '★' },
    { id: 'certifications', label: 'Certifications', icon: '⬡' },
    { id: 'projects', label: 'Projects', icon: '⊹' },
    { id: 'languages', label: 'Languages', icon: '◌' },
    { id: 'availability', label: 'Availability', icon: '◐' },
    { id: 'employment-gaps', label: 'Gaps', icon: '⊘' },
    { id: 'references', label: 'References', icon: '◫' },
  ];

  ngOnInit(): void {
    this.sub = this.resumeService.getResume().subscribe({
      next: (data) => {
        this.resume = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load resume.json — ' + err.message;
        this.loading = false;
      },
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
    const ids = this.navItems.map((n) => n.id);
    for (let i = ids.length - 1; i >= 0; i--) {
      const rect = document.getElementById(ids[i])?.getBoundingClientRect();
      if (rect && rect.top <= 120) {
        this.activeSection = ids[i];
        return;
      }
    }
    this.activeSection = ids[0];
  }
}
