import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table } from '../table/table';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, Table],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss'
})
export class Tasks {
  columns = ['Título', 'Estado', 'Fecha Creacion', 'Fecha Limite', 'Empleado Asignado'];
  tasks = [
    {
      Título: 'Tarea 1',
      Estado: 'En progreso',
      'Fecha Creacion': '2025-10-01',
      'Fecha Limite': '2025-10-15',
      'Empleado Asignado': 'Juan Pérez'
    },
    {
      Título: 'Tarea 2',
      Estado: 'Pendiente',
      'Fecha Creacion': '2025-09-20',
      'Fecha Limite': '2025-10-10',
      'Empleado Asignado': 'María López'
    },
    {
      Título: 'Tarea 3',
      Estado: 'Completada',
      'Fecha Creacion': '2025-08-15',
      'Fecha Limite': '2025-09-30',
      'Empleado Asignado': 'Carlos García'
    }
  ];
}
