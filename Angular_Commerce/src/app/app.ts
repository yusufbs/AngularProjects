import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Header } from './shared/layouts/header/header';
import { Footer } from './shared/layouts/footer/footer';
import { Navigation } from './navigation/navigation';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header], //Navigation, Footer
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private translate = inject(TranslateService);

  constructor() {
    this.translate.setFallbackLang('en');
    this.translate.use('en');
  }

  title = 'angular-ecommerce';
}
