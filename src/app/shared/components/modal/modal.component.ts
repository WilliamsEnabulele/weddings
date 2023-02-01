import { Component, EventEmitter, Input, Output } from '@angular/core';
import { transition, trigger, style, animate } from '@angular/animations';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() title!: string;
  @Output() closed = new EventEmitter<void>();

  closeModal() {
    this.closed.emit();
  }
}
