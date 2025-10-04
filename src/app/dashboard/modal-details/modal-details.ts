import { Component, Output, Input, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-details',
  templateUrl: './modal-details.html',
  styleUrls: ['./modal-details.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ModalDetailsComponent {
  @Input() visible = false;
  @Input() title = '';
  @Input() item: any;

  @Output() close = new EventEmitter<void>();

  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  formatValue(val: any): string {
    if (Array.isArray(val)) {
      return val.join(', ');
    }
    if (typeof val === 'object' && val !== null) {
      return JSON.stringify(val, null, 2);
    }
    return val;
  }

  onClose() {
    this.close.emit();
  }
}
