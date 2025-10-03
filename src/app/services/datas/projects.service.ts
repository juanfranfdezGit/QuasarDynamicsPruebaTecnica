import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class ProjectService {
    private storageKey = 'projects';
    private projects: any[] = [];

    constructor(private http: HttpClient) {}

    loadProjects(): Observable<any[]> {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
        this.projects = JSON.parse(stored);
        return of(this.projects); 
        } else {
        return this.http.get<any[]>('assets/datas/projects.json').pipe(
            tap(data => {
            this.projects = data;
            localStorage.setItem(this.storageKey, JSON.stringify(this.projects));
            })
        );
        }
  }

    addProject(project: any) {
        this.projects.push(project);
        localStorage.setItem(this.storageKey, JSON.stringify(this.projects));
    }

    editProject(id: number, updatedProject: any) {
        const index = this.projects.findIndex(p => p.ID === id);
        if (index !== -1) {
            this.projects[index] = { ...this.projects[index], ...updatedProject };
            localStorage.setItem(this.storageKey, JSON.stringify(this.projects));
        }
    }

    deleteProject(id: number) {
        this.projects = this.projects.filter(p => p.ID !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(this.projects));
    }
}