import { Component, OnInit } from '@angular/core';
import { Table } from '../table/table';
import { TaskService } from '../../services/datas/tasks.service';
import { EmployeeService } from '../../services/datas/employees.service';
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
  selector: 'app-tasks',
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.scss'],
  standalone: true,
  imports: [Table, HttpClientModule, ModalForm],
})
export class Tasks implements OnInit {
  tasks: any[] = [];
  showModal = false;
  newTask: any = {};
  employees: any[] = [];

  columns = [
    'ID',
    'Título',
    'Estado',
    'Fecha Creacion',
    'Fecha Limite',
    'Empleado Asignado',
    'Proyecto',
    'Ver',
    'Editar',
    'Eliminar',
  ];

  fields: Field[] = [
    { key: 'Título', label: 'Título', type: 'text' },
    { key: 'Estado', label: 'Estado', type: 'text' },
    { key: 'FechaCreacion', label: 'Fecha Creacion', type: 'date' },
    { key: 'FechaLimite', label: 'Fecha Limite', type: 'date' },
    {
      key: 'EmpleadoAsignado',
      label: 'Empleado Asignado',
      type: 'checkbox',
      options: [],
    },
  ];

  constructor(
    private taskService: TaskService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.loadTasks();
    this.employeeService.loadEmployees().subscribe((emps) => {
      this.employees = emps;
      this.updateFieldOptions();
    });
  }

  loadTasks() {
    this.taskService.loadTasks().subscribe((data) => (this.tasks = data));
  }

  updateFieldOptions() {
    this.fields = this.fields.map((f) => {
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
  }

  saveTask(task: any) {
    const empleadosSeleccionados = this.employees.filter((e) =>
      task.EmpleadoAsignado.includes(e.ID)
    );

    const tareaFinal = {
      ...task,
      EmpleadoAsignado: empleadosSeleccionados,
    };

    if (task.ID) {
      this.taskService.editTask(task.ID, tareaFinal);
    } else {
      tareaFinal.ID = this.tasks.length + 1;
      this.taskService.addTask(tareaFinal);
    }

    this.loadTasks();
    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
    this.newTask = {};
  }

  onEdit(task: any) {
    this.showModal = true;

    this.newTask = {
      ...task,
      EmpleadoAsignado: Array.isArray(task.EmpleadoAsignado)
        ? task.EmpleadoAsignado.map((e: any) => e.ID ?? e)
        : [],
    };
  }

  onDelete(task: any) {
    if (confirm(`¿Seguro que quieres eliminar "${task.Título}"?`)) {
      this.taskService.deleteTask(task.ID);
      this.loadTasks();
    }
  }
}
