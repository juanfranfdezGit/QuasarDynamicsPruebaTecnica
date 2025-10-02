import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table } from '../table/table';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, Table,],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {
  columns = ['Nombre', 'Descripción', 'Fecha Inicio', 'Fecha Fin Estimada'];
  projects = [
    {
      Nombre: 'Proyecto 1',
      Descripción: 'Descripción del proyecto 1',
      'Fecha Inicio': '2025-10-01',
      'Fecha Fin Estimada': '2025-12-31'
    },
    {
      Nombre: 'Proyecto 2',
      Descripción: 'Descripción del proyecto 2',
      'Fecha Inicio': '2025-09-15',
      'Fecha Fin Estimada': '2025-11-30'
    },
    {
      Nombre: 'Proyecto 3',
      Descripción: 'Descripción del proyecto 3',
      'Fecha Inicio': '2025-10-05',
      'Fecha Fin Estimada': '2026-01-15'
    }
  ];
}
