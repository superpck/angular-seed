import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class LoginComponent implements OnInit, OnDestroy {
  private formBuilder = inject(FormBuilder);
  private authService = inject(FakeAuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loginForm!: FormGroup;
  loading = false;
  errorMessage = '';
  returnUrl = '/'; // เปลี่ยนจาก '/home' เป็น '/' เพื่อให้ใช้ default route
  
  // Modern background images
  backgroundImages = [
    {
      src: 'images/login-abstract-blue.jpg',
      alt: 'Modern abstract blue background',
      title: 'Welcome to Angular Seed',
      subtitle: 'Modern web application platform'
    },
    {
      src: 'images/login-geometric.jpg',
      alt: 'Modern geometric pattern',
      title: 'Innovation Starts Here',
      subtitle: 'Building the future with Angular'
    },
    {
      src: 'images/login-waves.jpg',
      alt: 'Modern wave pattern',
      title: 'Professional Platform',
      subtitle: 'Enterprise-ready solutions'
    },
    {
      src: 'images/login-business.jpg',
      alt: 'Modern business environment',
      title: 'Digital Transformation',
      subtitle: 'Empowering your business'
    }
  ];
  
  currentImageIndex = 0;
  currentImage = this.backgroundImages[0];
  private autoSlideInterval: number | undefined;

  ngOnInit(): void {
    // สร้างฟอร์ม
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    // ลอก logout ก่อนเพื่อให้แน่ใจว่าไม่มีการ login ค้างอยู่
    this.authService.logout();

    // ดึงค่า returnUrl จาก query params ถ้ามี แต่ default เป็น '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
    // Set up automatic image rotation every 6 seconds
    this.startImageRotation();
  }
  
  ngOnDestroy(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }
  
  startImageRotation(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextImage();
    }, 6000); // Auto slide every 6 seconds
  }
  
  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.backgroundImages.length;
    this.currentImage = this.backgroundImages[this.currentImageIndex];
  }
  
  prevImage(): void {
    this.currentImageIndex = this.currentImageIndex === 0 
      ? this.backgroundImages.length - 1 
      : this.currentImageIndex - 1;
    this.currentImage = this.backgroundImages[this.currentImageIndex];
  }
  
  selectImage(index: number): void {
    this.currentImageIndex = index;
    this.currentImage = this.backgroundImages[index];
    
    // Reset auto-rotation after manual selection
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.startImageRotation();
    }
  }
  
  getNextIndex(): number {
    return (this.currentImageIndex + 1) % this.backgroundImages.length;
  }
  
  getPrevIndex(): number {
    return this.currentImageIndex === 0 
      ? this.backgroundImages.length - 1 
      : this.currentImageIndex - 1;
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
          console.log('Navigating to:', this.returnUrl);
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
