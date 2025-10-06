import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects-table',
  standalone: true,
  templateUrl: './projects-table.html',
  imports: [CommonModule],
  styleUrls: ['./projects-table.scss'],
})
export class ProjectsTable {
  @Input() projects: any[] = [];

  @Output() view = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  onView(project: any) {
    this.view.emit(project);
  }

  onEdit(project: any) {
    this.edit.emit(project);
  }

  onDelete(project: any) {
    this.delete.emit(project);
  }
}
