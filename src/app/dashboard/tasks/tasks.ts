import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/datas/tasks.service';
import { EmployeeService } from '../../services/datas/employees.service';
import { TaskTable } from './task-table/task-table';
import { ModalForm } from '../modal-form/modal-form';
import { ModalDetailsComponent } from '../modal-details/modal-details';

interface FieldOption {
  label: string;
  value: any;
}

interface Field {
  key: string;
  label: string;
  type: string;
  options?: FieldOption[];
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.scss'],
  imports: [TaskTable, ModalForm, ModalDetailsComponent],
  standalone: true,
})
export class Tasks implements OnInit {
  tasks: any[] = [];
  employees: any[] = [];
  showModal = false;
  newTask: any = {};
  showDetailsModal = false;
  selectedItem: any = null;

  estados = ['Pendiente', 'En progreso', 'Finalizada'];

  // Mantener taskFields inicial
  taskFields: Field[] = [
    { key: 'Titulo', label: 'Título', type: 'text' },
    { key: 'Descripción', label: 'Descripción', type: 'text' },
    { key: 'FechaLimite', label: 'Fecha límite', type: 'date' },
    {
      key: 'EmpleadoAsignado',
      label: 'Asignar Empleado',
      type: 'checkbox',
      options: [],
    },
  ];

  constructor(
    private taskService: TaskService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.loadEmployees();
    this.loadTasks();
  }

  loadEmployees() {
    this.employeeService.loadEmployees().subscribe((emps) => {
      this.employees = emps;
    });
  }

  loadTasks() {
    this.taskService.loadTasks().subscribe((data) => {
      this.tasks = data.map((t) => ({
        ...t,
        EmpleadoAsignado: Array.isArray(t.EmpleadoAsignado)
          ? t.EmpleadoAsignado
          : [t.EmpleadoAsignado],
      }));
    });
  }

  onEdit(task: any) {
    this.newTask = { ...task };

    this.taskFields = this.taskFields.map((f) => {
      if (f.key === 'EmpleadoAsignado') {
        return {
          ...f,
          options: this.employees.map((e) => ({
            label: e.Nombre,
            value: e.ID,
          })),
        };
      }
      return f;
    });

    this.showModal = true;
  }

  saveTask(task: any) {
    const empleadoIDs = Array.isArray(task.EmpleadoAsignado)
      ? task.EmpleadoAsignado
      : [task.EmpleadoAsignado];

    const tareaFinal = { ...task, EmpleadoAsignado: empleadoIDs };

    if (task.ID) {
      this.taskService.editTask(task.ID, tareaFinal);
      const index = this.tasks.findIndex((t) => t.ID === task.ID);
      if (index !== -1) this.tasks[index] = tareaFinal;
    } else {
      tareaFinal.ID = this.tasks.length + 1;
      this.taskService.addTask(tareaFinal);
      this.tasks.push(tareaFinal);
    }

    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
    this.newTask = {};
  }

  onDelete(task: any) {
    if (confirm(`¿Seguro que quieres eliminar "${task.Título}"?`)) {
      this.taskService.deleteTask(task.ID);
      this.tasks = this.tasks.filter((t) => t.ID !== task.ID);
    }
  }

  onView(task: any) {
    this.selectedItem = {
      ...task,
      EmpleadoAsignado: task.EmpleadoAsignado.map(
        (id: number) => this.employees.find((e) => e.ID === id)?.Nombre ?? ''
      ),
    };
    this.showDetailsModal = true;
  }

  closeDetailsModal() {
    this.showDetailsModal = false;
    this.selectedItem = null;
  }

  cambiarEstado(task: any, estado: string) {
    task.Estado = estado;
    this.taskService.editTask(task.ID, task);
  }

  getEmpleadosNombre(task: any) {
    return task.EmpleadoAsignado.map(
      (id: number) => this.employees.find((e) => e.ID === id)?.Nombre
    )
      .filter(Boolean)
      .join(', ');
  }
}
