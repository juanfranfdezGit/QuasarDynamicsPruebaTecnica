import { Component, OnInit } from '@angular/core';
import { Table } from '../table/table';
import { ProjectService } from '../../services/datas/projects.service';
import { EmployeeService } from '../../services/datas/employees.service';
import { TaskService } from '../../services/datas/tasks.service';
import { HttpClientModule } from '@angular/common/http';
import { ModalForm } from '../modal-form/modal-form';

interface FieldOption {
  label: string;
  value: any;
}
interface Field {
  key: string;
  label: string;
  type?: string;
  options?: FieldOption[];
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss'],
  standalone: true,
  imports: [Table, HttpClientModule, ModalForm],
})
export class Projects implements OnInit {
  showModal = false;
  newProject: any = {};
  projects: any[] = [];
  employees: any[] = [];
  tasks: any[] = [];

  columns = [
    'ID',
    'Nombre',
    'Descripcion',
    'FechaInicio',
    'FechaFin',
    'Empleados',
    'Tareas',
    'Editar',
    'Eliminar',
  ];

  fields: Field[] = [
    { key: 'Nombre', label: 'Nombre', type: 'text' },
    { key: 'Descripcion', label: 'Descripción', type: 'text' },
    { key: 'FechaInicio', label: 'Fecha de inicio', type: 'date' },
    { key: 'FechaFin', label: 'Fecha estimada', type: 'date' },
    {
      key: 'Empleados',
      label: 'Asignar Empleado',
      type: 'checkbox',
      options: [],
    },
    { key: 'Tareas', label: 'Asignar Tarea', type: 'checkbox', options: [] },
  ];

  constructor(
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.projectService.loadProjects().subscribe((data) => {
      this.projects = data;
    });

    this.employeeService.loadEmployees().subscribe((emps) => {
      this.employees = emps;
      this.updateFieldOptions();
    });

    this.taskService.loadTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.updateFieldOptions();
    });
  }

  updateFieldOptions() {
    this.fields = this.fields.map((f): Field => {
      if (f.key === 'Empleados') {
        return {
          ...f,
          options: this.employees.map((e) => ({
            label: e.Nombre,
            value: e.ID,
          })),
        };
      }
      if (f.key === 'Tareas') {
        return {
          ...f,
          options: this.tasks.map((t) => ({
            label: t.Título,
            value: t.ID,
          })),
        };
      }
      return f;
    });
  }

  saveProject(project: any) {
    if (!project.Nombre) return;

    const proyectoFinal = {
      ...project,
      Empleados: Array.isArray(project.Empleados) ? project.Empleados : [],
      Tareas: Array.isArray(project.Tareas) ? project.Tareas : [],
    };

    if (project.ID) {
      this.projectService.editProject(project.ID, proyectoFinal);
    } else {
      proyectoFinal.ID = this.projects.length + 1;
      this.projectService.addProject(proyectoFinal);
    }

    this.projects = [...this.projectService['projects']];
    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
    this.newProject = {};
  }

  onEdit(item: any) {
    this.showModal = true;
    this.newProject = {
      ...item,
      Empleados: Array.isArray(item.Empleados) ? item.Empleados : [],
      Tareas: Array.isArray(item.Tareas) ? item.Tareas : [],
    };
  }

  onDelete(item: any) {
    if (confirm(`¿Seguro que quieres eliminar "${item.Nombre}"?`)) {
      this.projectService.deleteProject(item.ID);
      this.projects = [...this.projectService['projects']];
    }
  }
}
