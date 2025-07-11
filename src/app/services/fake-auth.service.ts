import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LoginRequest, LoginResponse, User } from '../models/user.model';
import { AuthService } from './auth.service';

// ข้อมูล User จำลอง
const MOCK_USERS: User[] = [
  {
    id: 1,
    username: 'admin',
    name: 'Administrator',
    email: 'admin@example.com',
    role: 'admin'
  },
  {
    id: 2,
    username: 'user',
    name: 'Normal User',
    email: 'user@example.com',
    role: 'user'
  }
];

@Injectable({
  providedIn: 'root'
})
export class FakeAuthService extends AuthService {
  
  constructor() {
    super();
  }

  override login(loginRequest: LoginRequest): Observable<LoginResponse> {
    // ค้นหา user จากฐานข้อมูลจำลอง
    const user = MOCK_USERS.find(u => u.username === loginRequest.username);

    // สร้าง response
    let response: LoginResponse;

    if (user && loginRequest.password === 'password') { // รหัสผ่านแบบง่ายสำหรับการทดสอบ
      const token = `fake-jwt-token-${Math.random().toString(36).substring(2, 15)}`;
      response = {
        success: true,
        message: 'Login successful',
        token,
        user
      };
      // เก็บข้อมูล login
      this.storeLoginData(response);
    } else {
      response = {
        success: false,
        message: 'Username or password is incorrect'
      };
    }

    // จำลองการ delay เพื่อให้เหมือนการเรียก API จริง
    return of(response).pipe(delay(800));
  }
}
