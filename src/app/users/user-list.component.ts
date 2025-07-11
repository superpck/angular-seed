import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User, UserFilterCriteria } from '../models/user-data.model';
import { UserFormComponent } from './user-form.component';
import { ToastrService } from '../shared/services/toastr.service';
import { AlertService } from '../shared/services/alert.service';
import { ModalService } from '../shared/services/modal.service';
import { ModalModule } from '../shared/modal/modal.module';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    UserFormComponent,
    ModalModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  private userService = inject(UserService);
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);
  private alertService = inject(AlertService);
  protected modalService = inject(ModalService);
  
  // บรรทัดฐานคณิตศาสตร์
  protected Math = Math;
  
  // ข้อมูลผู้ใช้
  filteredUsers: User[] = [];
  displayedUsers: User[] = [];
  loading = true;
  
  // การกรอง
  filterForm: FormGroup;
  
  // การเพิ่ม/แก้ไขผู้ใช้
  showForm = false;
  editMode = false;
  selectedUser: User | null = null;
  
  // การแบ่งหน้า
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  
  constructor() {
    this.filterForm = this.fb.group({
      name: [''],
      email: [''],
      gender: [''],
      country: ['']
    });
  }
  
  ngOnInit(): void {
    this.loadUsers();
    
    // สมัครสมาชิกเพื่อดูการเปลี่ยนแปลงข้อมูลผู้ใช้
    this.userService.users$.subscribe(users => {
      this.filteredUsers = users;
      this.calculateTotalPages();
      this.updateDisplayedUsers();
      this.loading = false;
    });
  }
  
  loadUsers(): void {
    this.loading = true;
    this.userService.loadUsers().subscribe({
      complete: () => {
        this.loading = false;
        this.toastr.success('ข้อมูลผู้ใช้ถูกโหลดเรียบร้อยแล้ว', 'สำเร็จ');
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error('เกิดข้อผิดพลาดในการโหลดข้อมูลผู้ใช้', 'ข้อผิดพลาด');
        console.error('Error loading users:', err);
      }
    });
  }
  
  applyFilter(): void {
    const criteria: UserFilterCriteria = this.filterForm.value;
    this.userService.filterUsers(criteria);
    this.currentPage = 1; // รีเซ็ตกลับไปที่หน้าแรกเมื่อกรอง
    
    // ตรวจสอบว่ามีการกรองหรือไม่
    const hasFilter = Object.values(criteria).some(value => value && value.trim() !== '');
    if (hasFilter) {
      this.toastr.info('กรองข้อมูลตามเงื่อนไขที่กำหนดเรียบร้อยแล้ว', 'กรองข้อมูล');
    }
  }
  
  resetFilter(): void {
    this.filterForm.reset({
      name: '',
      email: '',
      gender: '',
      country: ''
    });
    this.userService.resetFilter();
    this.currentPage = 1;
    this.toastr.info('การกรองข้อมูลถูกรีเซ็ตเรียบร้อยแล้ว', 'รีเซ็ตตัวกรอง');
  }
  
  // การจัดการการแบ่งหน้า
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    if (this.totalPages === 0) this.totalPages = 1;
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
  }
  
  updateDisplayedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.filteredUsers.length);
    this.displayedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }
  
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedUsers();
    }
  }
  
  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    
    if (this.totalPages <= maxPagesToShow) {
      // แสดงทุกหน้าถ้ามีน้อยกว่าหรือเท่ากับ maxPagesToShow
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // แสดงหน้าแรก หน้าปัจจุบัน และหน้าใกล้เคียง
      let startPage = Math.max(this.currentPage - Math.floor(maxPagesToShow / 2), 1);
      let endPage = startPage + maxPagesToShow - 1;
      
      if (endPage > this.totalPages) {
        endPage = this.totalPages;
        startPage = Math.max(endPage - maxPagesToShow + 1, 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  }
  
  // การจัดการผู้ใช้ (CRUD)
  showAddForm(): void {
    this.selectedUser = null;
    this.editMode = false;
    
    // เปิด Modal แทนการแสดง inline form
    this.modalService.open({
      title: 'เพิ่มผู้ใช้ใหม่',
      size: 'xl',
      closeable: true,
      closeOnBackdropClick: false,
      data: { mode: 'add' }
    });
    
    // รับเหตุการณ์เมื่อ Modal ถูกปิด
    this.modalService.onClose.subscribe((data: unknown) => {
      if (data && typeof data === 'object' && 'saved' in data && 'user' in data) {
        this.saveUser(data.user as User);
      }
      // ยกเลิกการ subscribe เพื่อป้องกันการรั่วไหลของหน่วยความจำ
      this.modalService.onClose.subscribe().unsubscribe();
    });
  }
  
  editUser(user: User): void {
    this.selectedUser = { ...user }; // สร้างสำเนาเพื่อหลีกเลี่ยงการเปลี่ยนแปลงโดยตรง
    this.editMode = true;
    
    // เปิด Modal แทนการแสดง inline form
    this.modalService.open({
      title: `แก้ไขข้อมูลผู้ใช้: ${user.name.first} ${user.name.last}`,
      size: 'xl',
      closeable: true,
      closeOnBackdropClick: false,
      data: { user, mode: 'edit' }
    });
    
    // รับเหตุการณ์เมื่อ Modal ถูกปิด
    this.modalService.onClose.subscribe((data: unknown) => {
      if (data && typeof data === 'object' && 'saved' in data && 'user' in data) {
        this.saveUser(data.user as User);
      }
      // ยกเลิกการ subscribe เพื่อป้องกันการรั่วไหลของหน่วยความจำ
      this.modalService.onClose.subscribe().unsubscribe();
    });
  }
  
  saveUser(user: User): void {
    if (this.editMode) {
      this.userService.updateUser(user);
      this.toastr.success(`ข้อมูลของ ${user.name.first} ${user.name.last} ถูกอัปเดตเรียบร้อยแล้ว`, 'อัปเดตสำเร็จ');
    } else {
      this.userService.addUser(user);
      this.toastr.success(`เพิ่มข้อมูลของ ${user.name.first} ${user.name.last} เรียบร้อยแล้ว`, 'เพิ่มผู้ใช้สำเร็จ');
    }
    this.cancelForm();
  }
  
  cancelForm(): void {
    this.showForm = false;
    this.selectedUser = null;
  }
  
  confirmDelete(user: User): void {
    this.alertService.confirm(
      `คุณแน่ใจหรือไม่ที่จะลบข้อมูลของ ${user.name.first} ${user.name.last}?`,
      () => {
        this.userService.deleteUser(user.login.uuid);
        this.toastr.warning(`ข้อมูลของ ${user.name.first} ${user.name.last} ถูกลบเรียบร้อยแล้ว`, 'ลบผู้ใช้สำเร็จ');
      }
    );
  }
}
