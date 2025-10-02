import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table } from '../table/table';

@Component({
  selector: 'app-employees',
  imports: [CommonModule, Table],
  templateUrl: './employees.html',
  styleUrl: './employees.scss'
})
export class Employees {
  columns = ['Nombre', 'Puesto', 'Fecha Contratacion'];
  employees = [
    {
      Nombre: 'Juan Pérez',
      Puesto: 'Desarrollador',
      'Fecha Contratacion': '2023-01-15'
    },
    {
      Nombre: 'María López',
      Puesto: 'Diseñadora',
      'Fecha Contratacion': '2022-06-20'
    },
    {
      Nombre: 'Carlos García',
      Puesto: 'Project Manager',
      'Fecha Contratacion': '2021-09-10'
    }
  ];
}
