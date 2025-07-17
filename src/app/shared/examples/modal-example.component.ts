import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from '../modal/modal.module';
import { ModalService } from '../services/modal.service';
import { ModalSize } from '../models/modal.model';

@Component({
  selector: 'app-modal-example',
  standalone: true,
  imports: [CommonModule, ModalModule],
  template: `
    <div class="p-4">
      <h2 class="text-xl font-bold mb-4">Modal Examples</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <button class="pk-button pk-button-primary" (click)="openModal('sm')">Open Small Modal</button>
        <button class="pk-button pk-button-primary" (click)="openModal('md')">Open Medium Modal</button>
        <button class="pk-button pk-button-primary" (click)="openModal('lg')">Open Large Modal</button>
        <button class="pk-button pk-button-primary" (click)="openModal('xl')">Open Extra Large Modal</button>
        <button class="pk-button pk-button-primary" (click)="openModal('2xl')">Open 2X Large Modal</button>
        <button class="pk-button pk-button-primary" (click)="openModal('full')">Open Full Modal</button>
      </div>
      
      <!-- This component needs to be added once in your app's root component -->
      <app-modal>
        <div>
          <p class="mb-4">This is the modal content that can be customized.</p>
          <p class="mb-4">You can place any content here including forms, tables, images, etc.</p>
          
          <div class="bg-gray-100 p-4 rounded mb-4">
            <code>Modal size: {{ currentSize }}</code>
          </div>
          
          <p>When you're done with the modal, you can:</p>
          <ul class="list-disc ml-6 mb-4">
            <li>Click the X button in the top-right corner</li>
            <li>Click outside the modal (if closeOnBackdropClick is true)</li>
            <li>Press the Escape key</li>
            <li>Call modalService.close() from your component</li>
          </ul>
        </div>
        
        <!-- Modal Footer Content (note the modal-footer attribute) -->
        <div modal-footer>
          <button class="pk-button pk-button-outline pk-button-primary" (click)="closeModal()">Cancel</button>
          <button class="pk-button pk-button-primary" (click)="confirmModal()">Confirm</button>
        </div>
      </app-modal>
    </div>
  `
})
export class ModalExampleComponent {
  private modalService = inject(ModalService);
  protected currentSize: ModalSize = 'md';
  
  constructor() {
    // Subscribe to modal close events
  }
  
  openModal(size: ModalSize) {
    this.currentSize = size;
    this.modalService.open({
      title: `${this.getSizeTitle(size)} Modal Example`,
      size: size,
      closeable: true,
      closeOnBackdropClick: true,
      data: { example: 'data', size }
    });
  }
  
  closeModal() {
    this.modalService.close();
  }
  
  confirmModal() {
    this.modalService.close({ confirmed: true, size: this.currentSize });
  }
  
  private getSizeTitle(size: ModalSize): string {
    switch(size) {
      case 'sm': return 'Small';
      case 'md': return 'Medium';
      case 'lg': return 'Large';
      case 'xl': return 'Extra Large';
      case '2xl': return '2X Large';
      case 'full': return 'Full Screen';
      default: return 'Medium';
    }
  }
}
