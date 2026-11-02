import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationDemoComponent } from './demos/registration-demo/registration-demo.component';
import { JobApplicationDemoComponent } from './demos/job-application-demo/job-application-demo.component';
import { DynamicFormDemoComponent } from './demos/dynamic-form-demo/dynamic-form-demo.component';
import { CatalogDemoComponent } from './demos/catalog-demo/catalog-demo.component';
import { PromptViewerDemoComponent } from './demos/prompt-viewer-demo/prompt-viewer-demo.component';

export type ActiveTab = 'registration' | 'job' | 'dynamic' | 'catalog' | 'prompt';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RegistrationDemoComponent,
    JobApplicationDemoComponent,
    DynamicFormDemoComponent,
    CatalogDemoComponent,
    PromptViewerDemoComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  activeTab = signal<ActiveTab>('registration');
  isDarkMode = signal<boolean>(false);

  setTab(tab: ActiveTab): void {
    this.activeTab.set(tab);
  }

  toggleTheme(): void {
    this.isDarkMode.update((dark) => {
      const next = !dark;
      if (typeof document !== 'undefined') {
        if (next) {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.removeAttribute('data-theme');
        }
      }
      return next;
    });
  }
}
