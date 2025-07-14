import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrComponent } from './shared/toastr/toastr.component';
import { AlertComponent } from './shared/alert/alert.component';
import { ModalModule } from './shared/modal/modal.module';
import { ModalService } from './shared/services/modal.service';
import { ToastrService } from './shared/services/toastr.service';

// Define type for modal data
interface CardData {
  id: number;
  title: string;
  description: string;
  type: string;
  image: string;
}

interface ModalData {
  card?: CardData;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ToastrComponent, AlertComponent, ModalModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'angular-seed';
  protected modalService = inject(ModalService);
  private toastr = inject(ToastrService);
  
  /**
   * รับข้อมูล card จาก modal data
   */
  getCardData(): CardData | undefined {
    const data = this.modalService.modal().config?.data as ModalData;
    return data?.card;
  }
  
  /**
   * ปิด Modal พร้อมส่งข้อมูลกลับ
   */
  closeModalWithData(): void {
    this.modalService.close({ 
      action: 'close_with_data', 
      data: { timestamp: new Date() } 
    });
    this.toastr.info('Modal ถูกปิดพร้อมส่งข้อมูลกลับ', 'Modal ถูกปิด');
  }
}
