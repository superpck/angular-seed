import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated) {
    return true;
  }

  // เก็บ URL ที่พยายามเข้าถึงเพื่อนำทางกลับหลังจาก login สำเร็จ
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
