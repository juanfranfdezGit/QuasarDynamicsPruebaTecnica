import { Component, OnInit } from '@angular/core';
import { Table } from '../table/table';
import { EmployeeService } from '../../services/datas/employees.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.html',
  styleUrls: ['./employees.scss'],
  standalone: true,
  imports: [Table, HttpClientModule],
})
export class Employees implements OnInit {
  employees: any[] = [];

  columns = [
    'ID',
    'Nombre',
    'Correo',
    'Puesto',
    'Proyectos',
    'Tareas',
  ];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService
      .loadEmployees()
      .subscribe((data) => (this.employees = data));
  }

  onDelete(employee: any) {
    if (confirm(`¿Seguro que quieres eliminar "${employee.NombreCompleto}"?`)) {
      this.employeeService.deleteEmployee(employee.ID);
      this.loadEmployees();
    }
  }
}
