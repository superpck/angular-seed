# AuthService

AuthService เป็นบริการสำหรับจัดการการยืนยันตัวตนของผู้ใช้

## คุณสมบัติ

- **Login/Logout** - การเข้าสู่ระบบและออกจากระบบ
- **User Data Storage** - จัดเก็บข้อมูลผู้ใช้ที่ล็อกอิน
- **Authentication State** - ตรวจสอบสถานะการยืนยันตัวตน
- **Route Guards** - ป้องกันการเข้าถึงหน้าที่ต้องการการยืนยันตัวตน

## การใช้งาน

### การ Inject AuthService

```typescript
import { AuthService } from '@app/services/auth.service';

@Component({
  // ...
})
export class YourComponent {
  constructor(private authService: AuthService) {}
  
  // ...
}
```

### การเข้าสู่ระบบ

```typescript
login() {
  this.authService.login(this.username, this.password).subscribe({
    next: (user) => {
      console.log('Logged in user:', user);
      this.router.navigate(['/home']);
    },
    error: (err) => {
      console.error('Login failed:', err);
      // แสดงข้อความผิดพลาด
    }
  });
}
```

### การตรวจสอบสถานะการเข้าสู่ระบบ

```typescript
ngOnInit() {
  // ใช้ Observable
  this.authService.isAuthenticated$.subscribe(isAuthenticated => {
    this.isLoggedIn = isAuthenticated;
  });
  
  // หรือใช้ getter
  this.isLoggedIn = this.authService.isAuthenticated;
}
```

### การดึงข้อมูลผู้ใช้ปัจจุบัน

```typescript
ngOnInit() {
  // ใช้ Observable
  this.authService.currentUser$.subscribe(user => {
    this.currentUser = user;
  });
  
  // หรือใช้ getter
  this.currentUser = this.authService.currentUser;
}
```

### การออกจากระบบ

```typescript
logout() {
  this.authService.logout();
  this.router.navigate(['/login']);
}
```

## การจัดการ Route Guards

โปรเจคนี้มี AuthGuard สำหรับป้องกันการเข้าถึงหน้าที่ต้องการการยืนยันตัวตน:

### การใช้งานใน Routes

```typescript
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'home', 
    component: HomeComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'admin', 
    component: AdminComponent,
    canActivate: [authGuard],
    data: { roles: ['admin'] }  // ต้องการบทบาท admin
  }
];
```

### การสร้าง AuthGuard

```typescript
// auth.guard.ts
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (!authService.isAuthenticated) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
  
  // ตรวจสอบบทบาท (ถ้าต้องการ)
  const requiredRoles = route.data['roles'] as Array<string>;
  if (requiredRoles && !authService.hasRole(requiredRoles)) {
    router.navigate(['/unauthorized']);
    return false;
  }
  
  return true;
};
```

## การปรับแต่ง AuthService

คุณสามารถปรับแต่ง AuthService ให้เชื่อมต่อกับ backend API ของคุณ:

1. เปิดไฟล์ `src/app/services/auth.service.ts`
2. แก้ไขเมธอด `login()` เพื่อเชื่อมต่อกับ API ของคุณ
3. ปรับแต่งรูปแบบข้อมูลผู้ใช้ให้ตรงกับ API ของคุณ
