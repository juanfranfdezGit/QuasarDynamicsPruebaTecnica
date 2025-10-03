import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-form.html',
  styleUrl: './modal-form.scss',
})
export class ModalForm {
  @Input() visible = false;
  @Input() title = 'Formulario';
  @Input() fields: {
    key: string;
    label: string;
    type?: string;
    options?: { label: string; value: any }[];
  }[] = [];
  @Input() formData: any = {};

  @Output() onSubmit = new EventEmitter<any>();
  @Output() onClose = new EventEmitter<void>();

  getOptionLabel(fieldKey: string, value: any): string {
    if (fieldKey === 'Empleados') {
      const empleados = JSON.parse(localStorage.getItem('employees') || '[]');
      const emp = empleados.find((e: any) => e.ID == value);
      return emp ? emp.Nombre : value;
    }

    if (fieldKey === 'Tareas') {
      const tareas = JSON.parse(localStorage.getItem('tasks') || '[]');
      const task = tareas.find((t: any) => t.ID == value);
      return task ? task.Título : value;
    }

    return value;
  }

  onCheckboxChange(event: any, key: string) {
    if (!this.formData[key]) {
      this.formData[key] = [];
    }

    const value = event.target.value;
    if (event.target.checked) {
      this.formData[key].push(value);
    } else {
      this.formData[key] = this.formData[key].filter((v: any) => v !== value);
    }
  }

  submitForm() {
    this.formData.Editar = 'assets/edit.png';
    this.formData.Eliminar = 'assets/delete.png';

    this.onSubmit.emit(this.formData);
    this.close();
  }

  close() {
    this.visible = false;
    this.formData = {};
    this.onClose.emit();
  }
}
