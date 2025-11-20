import { inject, Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable({
  providedIn: 'root',
})
export class CoursesEffects {
  private actions$ = inject(Actions);
}
