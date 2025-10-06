import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employees-table',
  standalone: true,
  templateUrl: './employees-table.html',
  styleUrls: ['./employees-table.scss'],
  imports: [CommonModule],
})
export class EmployeesTable {
  @Input() employees: any[] = [];

  @Output() view = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  onView(emp: any) {
    this.view.emit(emp);
  }

  onEdit(emp: any) {
    this.edit.emit(emp);
  }

  onDelete(emp: any) {
    this.delete.emit(emp);
  }
}