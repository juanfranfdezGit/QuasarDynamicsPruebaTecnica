import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  templateUrl: './table.html',
  styleUrls: ['./table.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class Table {
  @Input() data: any[] = [];
  @Input() columns: string[] = [];

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() rowClick = new EventEmitter<any>();

  @Output() view = new EventEmitter<any>();

  isArray(val: any) {
    return Array.isArray(val);
  }

  onView(item: any) {
    this.view.emit(item);
  }

  onEdit(item: any) {
    this.edit.emit(item);
  }

  onDelete(item: any) {
    this.delete.emit(item);
  }

  onRowClick(item: any) {
    this.rowClick.emit(item);
  }
}
