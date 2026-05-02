import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
  photo?: string;
}

export interface TechnicalSkills {
  [category: string]: string[];
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

export interface Education {
  institution: string;
  degree: string;
  focus: string;
  graduationYear: string;
  gpa: string;
  honors?: string;
}

export interface Achievement {
  title: string;
  year: string;
  description: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  credentialId: string;
}

export interface Project {
  name: string;
  url: string;
  tech: string[];
  description: string;
}

export interface Language {
  language: string;
  proficiency: string;
}

export interface Availability {
  status: string;
  startDate: string;
  preferredRoles: string[];
  workType: string[];
  locations: string[];
  noticePeriod: string;
}

export interface EmploymentGap {
  startDate: string;
  endDate: string;
  reason: string;
  description: string;
}

export interface Reference {
  name: string;
  title: string;
  email: string;
  phone: string;
  relationship: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  technicalSkills: TechnicalSkills;
  coreCompetencies: string[];
  professionalExperience: Experience[];
  education: Education[];
  achievements: Achievement[];
  certifications: Certification[];
  projects: Project[];
  languages: Language[];
  availability: Availability;
  employmentGaps: EmploymentGap[];
  references: Reference[];
}

@Injectable({ providedIn: 'root' })
export class ResumeService {
  private http = inject(HttpClient);
  private resume$: Observable<ResumeData>;

  constructor() {
    this.resume$ = this.http.get<ResumeData>('assets/resume.json').pipe(
      shareReplay(1)
    );
  }

  getResume(): Observable<ResumeData> {
    return this.resume$;
  }
}
