import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private storageKey = 'tasks';
  private tasks: any[] = [];

  constructor(private http: HttpClient) {}

  loadTasks(): Observable<any[]> {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      this.tasks = JSON.parse(stored);
      return of(this.tasks);
    } else {
      return this.http.get<any[]>('assets/datas/tasks.json').pipe(
        tap((data) => {
          this.tasks = data;
          localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
        })
      );
    }
  }

  addTask(task: any) {
    this.tasks.push(task);
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
  }

  editTask(id: number, updatedTask: any) {
    const index = this.tasks.findIndex((t) => t.ID === id);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...updatedTask };
      localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((t) => t.ID !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
  }
}
