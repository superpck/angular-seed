import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FakeAuthService } from '../services/fake-auth.service';
import { finalize } from 'rxjs/operators';
import { inject } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private authService = inject(FakeAuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loginForm!: FormGroup;
  loading = false;
  errorMessage = '';
  returnUrl = '/users'; // เปลี่ยนจาก '/' เป็น '/users'

  ngOnInit(): void {
    // สร้างฟอร์ม
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    // ลอก logout ก่อนเพื่อให้แน่ใจว่าไม่มีการ login ค้างอยู่
    this.authService.logout();

    // ดึงค่า returnUrl จาก query params ถ้ามี แต่ default เป็น '/users'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  onSubmit(): void {
    // หยุดถ้าฟอร์มไม่ถูกต้อง
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    })
    .pipe(
      finalize(() => {
        this.loading = false;
      })
    )
    .subscribe({
      next: (response) => {
        if (response.success) {
          // นำทางไปยังหน้าที่ต้องการหลังจาก login สำเร็จ
          this.router.navigate([this.returnUrl]);
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (error) => {
        this.errorMessage = 'An error occurred during login. Please try again later.';
        console.error('Login error:', error);
      }
    });
  }
}
