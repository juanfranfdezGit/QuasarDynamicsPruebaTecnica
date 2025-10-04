import { Component, OnInit } from '@angular/core';
import { Table } from '../table/table';
import { EmployeeService } from '../../services/datas/employees.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ModalDetailsComponent } from '../modal-details/modal-details';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.html',
  styleUrls: ['./employees.scss'],
  standalone: true,
  imports: [Table, HttpClientModule, CommonModule, ModalDetailsComponent],
})
export class Employees implements OnInit {
  employees: any[] = [];

  showDetailsModal = false;
  selectedItem: any = null;

  columns = [
    'ID',
    'Nombre',
    'Correo',
    'Puesto',
    'Proyectos',
    'Tareas',
    '',
    'Ver',
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

  onView(task: any) {
    const empleadosNombres = (task.EmpleadoAsignado || [])
      .map((id: number | any) => {
        if (typeof id === 'number') {
          return this.employees.find((e) => e.ID === id)?.Nombre;
        }
        return id?.Nombre ?? id;
      })
      .filter(Boolean);

    this.selectedItem = {
      ...task,
      EmpleadoAsignado: empleadosNombres,
    };

    console.log('selectedItem', this.selectedItem);

    this.showDetailsModal = true;
  }

  closeDetailsModal() {
    this.showDetailsModal = false;
    this.selectedItem = null;
  }

  onDelete(employee: any) {
    if (confirm(`¿Seguro que quieres eliminar "${employee.NombreCompleto}"?`)) {
      this.employeeService.deleteEmployee(employee.ID);
      this.loadEmployees();
    }
  }
}
