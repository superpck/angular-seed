import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalService } from './shared/services/modal.service';
import { ToastrService } from './shared/services/toastr.service';
import { AlertService } from './shared/services/alert.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  protected title = 'angular-seed';
  protected modalService = inject(ModalService);
  private toastr = inject(ToastrService);
  private alertService = inject(AlertService);
  
  ngOnInit(): void {
    // AlertService จะสร้าง AlertComponent โดยอัตโนมัติเมื่อ initialize
    console.log('Services initialized with dynamic component loading');
    this.alertService.initialize(); // เรียกใช้ initialize เพื่อสร้าง AlertComponent
    this.toastr.initialize(); // เรียกใช้ initialize เพื่อสร้าง ToastrComponent
    this.modalService.initialize(); // เรียกใช้ initialize เพื่อสร้าง ModalComponent
  }
  
  ngOnDestroy(): void {
    // ทำลาย Component เมื่อ App component ถูกทำลาย
    this.alertService.destroyAlert();
    this.toastr.destroyToastr();
    this.modalService.destroyModal();
  }
}
