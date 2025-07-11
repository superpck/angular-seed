import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { LoginRequest, LoginResponse, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // สำหรับเก็บ token ใน session storage
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';

  constructor() {
    // ตรวจสอบว่ามี token และ user ที่เก็บไว้ใน storage หรือไม่
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const token = sessionStorage.getItem(this.TOKEN_KEY);
    const userJson = sessionStorage.getItem(this.USER_KEY);
    
    if (token && userJson) {
      const user = JSON.parse(userJson) as User;
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    console.log(loginRequest);
    // จะถูก override โดย FakeAuthService
    return throwError(() => new Error('Method not implemented'));
  }

  logout(): void {
    // ลบข้อมูลจาก storage
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
    
    // รีเซ็ตสถานะการ login
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // เก็บข้อมูลการ login
  protected storeLoginData(response: LoginResponse): void {
    if (response.success && response.token && response.user) {
      sessionStorage.setItem(this.TOKEN_KEY, response.token);
      sessionStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
      this.currentUserSubject.next(response.user);
      this.isAuthenticatedSubject.next(true);
    }
  }
}
