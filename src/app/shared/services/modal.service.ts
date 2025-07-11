import { Injectable, signal } from '@angular/core';
import { ModalConfig, ModalState } from '../models/modal.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  // Modal state signal
  private modalState = signal<ModalState>({ show: false });
  
  // Observable for close and data events
  private closeSubject = new Subject<unknown>();
  
  // Public signal for components to access
  public modal = this.modalState.asReadonly();
  
  // Public observable for close events
  public onClose = this.closeSubject.asObservable();
  
  /**
   * Open the modal with the provided configuration
   */
  open(config: ModalConfig = {}): void {
    // Set default values if not provided
    const defaultConfig: ModalConfig = {
      size: 'md',
      closeable: true,
      closeOnBackdropClick: true,
      ...config
    };
    
    this.modalState.set({ show: true, config: defaultConfig });
  }
  
  /**
   * Close the modal and optionally pass data to the component that opened it
   */
  close(data?: unknown): void {
    this.modalState.set({ show: false });
    this.closeSubject.next(data);
  }
}
