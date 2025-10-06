import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private storageKey = 'employees';
  private employees: any[] = [];

  constructor(private http: HttpClient) {}

  loadEmployees(): Observable<any[]> {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      this.employees = JSON.parse(stored);
      return of(this.employees);
    } else {
      return this.http.get<any[]>('assets/datas/employees.json').pipe(
        tap((data) => {
          this.employees = data;
          localStorage.setItem(this.storageKey, JSON.stringify(this.employees));
        })
      );
    }
  }

  getEmployees(): any[] {
    return [...this.employees];
  }

  addEmployee(employee: any) {
    this.employees.push(employee);
    this.saveToLocalStorage();
  }

  editEmployee(id: number, updatedData: any) {
    const index = this.employees.findIndex((e) => e.ID === id);
    if (index !== -1) {
      this.employees[index] = { ...this.employees[index], ...updatedData };
      this.saveToLocalStorage();
    }
  }

  editEmployeeTasks(id: number, tareas: any[]) {
    const index = this.employees.findIndex((e) => e.ID === id);
    if (index !== -1) {
      this.employees[index].Tareas = tareas;
      this.saveToLocalStorage();
    }
  }

  deleteEmployee(id: number) {
    this.employees = this.employees.filter((e) => e.ID !== id);
    this.saveToLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.employees));
  }
}
