import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should default to registration tab', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.activeTab()).toBe('registration');
  });

  it('should switch to dynamic schema tab', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.setTab('dynamic');
    expect(app.activeTab()).toBe('dynamic');
  });

  it('should toggle theme mode', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.isDarkMode()).toBe(false);
    app.toggleTheme();
    expect(app.isDarkMode()).toBe(true);
  });
});
});
