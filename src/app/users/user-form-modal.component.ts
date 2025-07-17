import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../shared/services/modal.service';
import { UserFormComponent } from './user-form.component';
import { User } from '../models/user-data.model';

@Component({
  selector: 'app-user-form-modal',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  template: `
    <app-user-form 
      [user]="user" 
      [editMode]="editMode"
      (save)="onSave($event)"
      (cancelForm)="onCancel()">
    </app-user-form>
    
    <div class="flex justify-end space-x-4 mt-4">
      <button class="pk-button pk-button-outline pk-button-primary" (click)="onCancel()">
        ยกเลิก
      </button>
    </div>
  `
})
export class UserFormModalComponent {
  private modalService = inject(ModalService);
  
  @Input() user: User | null = null;
  @Input() editMode = false;
  
  onSave(user: User): void {
    this.modalService.close({ saved: true, user });
  }
  
  onCancel(): void {
    this.modalService.close();
  }
}
