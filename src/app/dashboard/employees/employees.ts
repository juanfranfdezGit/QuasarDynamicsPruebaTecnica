import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/datas/employees.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ModalDetailsComponent } from '../modal-details/modal-details';
import { ModalForm } from '../modal-form/modal-form';
import { EmployeesTable } from './employees-table/employees-table';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.html',
  styleUrls: ['./employees.scss'],
  standalone: true,
  imports: [HttpClientModule, ModalForm, CommonModule, ModalDetailsComponent, EmployeesTable],
})
export class Employees implements OnInit {
  employees: any[] = [];
  showModal = false;
  newEmployee: any = {};

  showDetailsModal = false;
  selectedItem: any = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService
      .loadEmployees()
      .subscribe((data) => (this.employees = data));
  }

  onView(employee: any) {
    this.selectedItem = { ...employee };
    this.showDetailsModal = true;
  }

  onEdit(employee: any) {
    this.showModal = true;
    this.newEmployee = { ...employee };
  }

  saveEmployee(employee: any) {
    const empleadoFinal = {
      ...employee,
      Proyectos: employee.Proyectos ?? [],
      Tareas: employee.Tareas ?? [],
    };

    if (employee.ID) {
      this.employeeService.editEmployee(employee.ID, empleadoFinal);
    } else {
      empleadoFinal.ID = this.employees.length + 1;
      this.employeeService.addEmployee(empleadoFinal);
    }

    this.loadEmployees();
    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
    this.newEmployee = {};
  }

  closeDetailsModal() {
    this.showDetailsModal = false;
    this.selectedItem = null;
  }

  onDelete(employee: any) {
    if (confirm(`¿Seguro que quieres eliminar "${employee.Nombre}"?`)) {
      this.employeeService.deleteEmployee(employee.ID);
      this.loadEmployees();
    }
  }
}
