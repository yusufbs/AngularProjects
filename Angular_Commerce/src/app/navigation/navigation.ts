import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink, RouterLinkActive, Routes } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation implements OnInit {
  allRoutes: Array<{
    path: string;
    fullPath: string;
    data?: any;
    children?: any[];
  }> = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.extractAllRoutes();
  }

  private extractAllRoutes(): void {
    const routes = this.router.config;
    this.processRoutes(routes);
  }

  private processRoutes(routes: Routes, parentPath: string = '', depth: number = 0): void {
    routes.forEach((route: Route) => {
      // Skip redirect routes and empty path routes
      if (route.redirectTo || route.path === '') {
        return;
      }

      // Build full path
      const fullPath = parentPath ? `${parentPath}/${route.path}` : `/${route.path}`;

      // Add route to list
      this.allRoutes.push({
        path: route.path || '',
        fullPath: fullPath,
        data: route.data || {},
        children: route.children || [],
      });

      // Process children recursively
      if (route.children && route.children.length > 0) {
        this.processRoutes(route.children, fullPath, depth + 1);
      }
    });
  }

  // Get route title (from data or generate from path)
  getRouteTitle(route: any): string {
    if (route.data && route.data['title']) {
      return route.data['title'];
    }

    // Convert path to title (e.g., 'my-route' -> 'My Route')
    return route.path
      .split('-')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
