import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ToastrService } from '../services/toastr.service';
import { Toast } from '../models/toast.model';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-toastr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class ToastrComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  private subscription!: Subscription;
  private toastrService = inject(ToastrService);
  private sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    this.subscription = this.toastrService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // ปิด toast ด้วยตนเอง
  removeToast(id: string): void {
    this.toastrService.remove(id);
  }

  // ดึงคลาสของ toast ตามประเภท
  getToastClasses(toast: Toast): string {
    let classes = 'toast-item';
    
    switch (toast.type) {
      case 'success':
        classes += ' bg-green-500';
        break;
      case 'error':
        classes += ' bg-red-500';
        break;
      case 'warning':
        classes += ' bg-yellow-500';
        break;
      case 'info':
        classes += ' bg-blue-500';
        break;
      default:
        classes += ' bg-gray-500';
    }
    
    return classes;
  }

  // ดึงไอคอนตามประเภทของ toast
  getIcon(type: string): SafeHtml {
    let iconHtml = '';
    
    switch (type) {
      case 'success':
        iconHtml = `
          <div class="flex items-center">
            <span class="text-xl mr-1">✅</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        `;
        break;
      case 'error':
        iconHtml = `
          <div class="flex items-center">
            <span class="text-xl mr-1">❌</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        `;
        break;
      case 'warning':
        iconHtml = `
          <div class="flex items-center">
            <span class="text-xl mr-1">⚠️</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        `;
        break;
      case 'info':
        iconHtml = `
          <div class="flex items-center">
            <span class="text-xl mr-1">ℹ️</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        `;
        break;
      default:
        iconHtml = '';
    }
    
    // บอก Angular ว่า HTML นี้ปลอดภัยและไม่จำเป็นต้อง sanitize
    return this.sanitizer.bypassSecurityTrustHtml(iconHtml);
  }
}
