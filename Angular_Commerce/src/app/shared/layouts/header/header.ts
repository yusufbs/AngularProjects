import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [TranslatePipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  logged_in: Boolean = false;
  language: String = 'English';
  user_role: String | null = null;

  private translate = inject(TranslateService);
  private router = inject(Router);

  ngOnInit() {}

  ngDoCheck() {
    this.user_role = sessionStorage.getItem('role');
    // console.log(this.user_role);

    const user_session_id = sessionStorage.getItem('user_session_id');
    if (user_session_id) {
      this.logged_in = true;
    }
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    if (language == 'en') {
      this.language = 'English';
    } else if (language == 'hn') {
      this.language = 'हिंदी(Hindi)';
    }
  }

  logOut() {
    sessionStorage.removeItem('user_session_id');
    sessionStorage.removeItem('role');
    this.router.navigateByUrl('/sign-in');
    location.reload();
  }
}
