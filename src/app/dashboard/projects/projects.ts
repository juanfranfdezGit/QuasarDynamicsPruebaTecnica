import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/datas/projects.service';
import { EmployeeService } from '../../services/datas/employees.service';
import { TaskService } from '../../services/datas/tasks.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ModalForm } from '../modal-form/modal-form';
import { ModalDetailsComponent } from '../modal-details/modal-details';
import { ProjectsTable } from './projects-table/projects-table';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss'],
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    ModalForm,
    ModalDetailsComponent,
    ProjectsTable,
  ],
})
export class Projects implements OnInit {
  projects: any[] = [];
  employees: any[] = [];
  tasks: any[] = [];

  showModal = false;
  newProject: any = {};

  showDetailsModal = false;
  selectedItem: any = null;

  constructor(
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.loadEmployees();
    this.loadTasks();
    this.loadProjects();
  }

  loadEmployees() {
    this.employeeService.loadEmployees().subscribe((emps) => {
      this.employees = emps;
    });
  }

  loadTasks() {
    this.taskService.loadTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  loadProjects() {
    this.projectService.loadProjects().subscribe((data) => {
      this.projects = data.map((p) => ({
        ...p,
        Empleados: (p.Empleados || []).map(
          (id: number) => this.employees.find((e) => e.ID === id)?.Nombre ?? ''
        ),
        Tareas: (p.Tareas || []).map(
          (id: number) => this.tasks.find((t) => t.ID === id)?.Título ?? ''
        ),
      }));
    });
  }

  onView(project: any) {
    this.selectedItem = {
      ...project,
      Empleados: (project.Empleados || []).join(', '),
      Tareas: (project.Tareas || []).join(', '),
    };
    this.showDetailsModal = true;
  }

  closeDetailsModal() {
    this.showDetailsModal = false;
    this.selectedItem = null;
  }

  onEdit(project: any) {
    this.showModal = true;
    this.newProject = {
      ...project,
      Empleados: project.Empleados || [],
      Tareas: project.Tareas || [],
    };
  }

  saveProject(project: any) {
    const proyectoFinal = {
      ...project,
      Empleados: Array.isArray(project.Empleados) ? project.Empleados : [],
      Tareas: Array.isArray(project.Tareas) ? project.Tareas : [],
    };

    if (project.ID) {
      this.projectService.editProject(project.ID, proyectoFinal);
      const index = this.projects.findIndex((p) => p.ID === project.ID);
      if (index !== -1) {
        this.projects[index] = {
          ...proyectoFinal,
          Empleados: proyectoFinal.Empleados.map(
            (id: number) =>
              this.employees.find((e) => e.ID === id)?.Nombre ?? ''
          ),
          Tareas: proyectoFinal.Tareas.map(
            (id: number) => this.tasks.find((t) => t.ID === id)?.Título ?? ''
          ),
        };
      }
    } else {
      proyectoFinal.ID = this.projects.length + 1;
      this.projectService.addProject(proyectoFinal);
      this.projects.push({
        ...proyectoFinal,
        Empleados: proyectoFinal.Empleados.map(
          (id: number) => this.employees.find((e) => e.ID === id)?.Nombre ?? ''
        ),
        Tareas: proyectoFinal.Tareas.map(
          (id: number) => this.tasks.find((t) => t.ID === id)?.Título ?? ''
        ),
      });
    }

    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
    this.newProject = {};
  }

  onDelete(project: any) {
    if (confirm(`¿Seguro que quieres eliminar "${project.Nombre}"?`)) {
      this.projectService.deleteProject(project.ID);
      this.projects = this.projects.filter((p) => p.ID !== project.ID);
    }
  }
}
