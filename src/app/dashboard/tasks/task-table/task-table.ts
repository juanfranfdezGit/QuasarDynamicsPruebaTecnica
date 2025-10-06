import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.html',
  styleUrls: ['./task-table.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TaskTable {
  @Input() tasks: any[] = [];
  @Input() employees: any[] = [];
  @Input() estados: string[] = [];

  @Output() editTask = new EventEmitter<any>();
  @Output() deleteTask = new EventEmitter<any>();
  @Output() viewTask = new EventEmitter<any>();
  @Output() changeEstado = new EventEmitter<{ task: any; estado: string }>();

  getEmpleadosNombre(task: any) {
    return task.EmpleadoAsignado.map(
      (id: number) => this.employees.find((e) => e.ID === id)?.Nombre
    )
      .filter(Boolean)
      .join(', ');
  }

  onChangeEstado(task: any, estado: string) {
    this.changeEstado.emit({ task, estado });
  }

  onEdit(task: any) {
    this.editTask.emit(task);
  }

  onDelete(task: any) {
    this.deleteTask.emit(task);
  }

  onView(task: any) {
    this.viewTask.emit(task);
  }
}
