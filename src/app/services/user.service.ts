import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { User, UserFilterCriteria, UserResponse } from '../models/user-data.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable();
  
  private apiUrl = 'https://randomuser.me/api/';
  private cachedUsers: User[] = [];

  // สำหรับจัดการข้อมูลผู้ใช้ในหน่วยความจำ
  loadUsers(count: number = 100): Observable<User[]> {
    return this.http.get<UserResponse>(`${this.apiUrl}?results=${count}`).pipe(
      map(response => response.results),
      tap(users => {
        this.cachedUsers = users;
        this.usersSubject.next(users);
      }),
      catchError(error => {
        console.error('Error loading users:', error);
        return of([]);
      })
    );
  }

  // กรองข้อมูลผู้ใช้ตามเกณฑ์
  filterUsers(criteria: UserFilterCriteria): void {
    if (!this.cachedUsers.length) {
      return;
    }

    let filteredUsers = [...this.cachedUsers];

    if (criteria.name) {
      const nameLower = criteria.name.toLowerCase();
      filteredUsers = filteredUsers.filter(user => 
        `${user.name.first} ${user.name.last}`.toLowerCase().includes(nameLower)
      );
    }

    if (criteria.email) {
      const emailLower = criteria.email.toLowerCase();
      filteredUsers = filteredUsers.filter(user => 
        user.email.toLowerCase().includes(emailLower)
      );
    }

    if (criteria.gender) {
      filteredUsers = filteredUsers.filter(user => 
        user.gender === criteria.gender
      );
    }

    if (criteria.country) {
      const countryLower = criteria.country.toLowerCase();
      filteredUsers = filteredUsers.filter(user => 
        user.location.country.toLowerCase().includes(countryLower)
      );
    }

    this.usersSubject.next(filteredUsers);
  }

  // ค้นหาผู้ใช้ตาม ID
  getUserByUuid(uuid: string): User | undefined {
    return this.cachedUsers.find(user => user.login.uuid === uuid);
  }

  // เพิ่มผู้ใช้ใหม่ (จำลอง)
  addUser(user: User): void {
    // ในสถานการณ์จริงนี่จะเป็น API call
    this.cachedUsers = [user, ...this.cachedUsers];
    this.usersSubject.next(this.cachedUsers);
  }

  // อัปเดตผู้ใช้ที่มีอยู่ (จำลอง)
  updateUser(updatedUser: User): void {
    // ในสถานการณ์จริงนี่จะเป็น API call
    const index = this.cachedUsers.findIndex(u => u.login.uuid === updatedUser.login.uuid);
    if (index !== -1) {
      this.cachedUsers[index] = updatedUser;
      this.usersSubject.next([...this.cachedUsers]);
    }
  }

  // ลบผู้ใช้ (จำลอง)
  deleteUser(uuid: string): void {
    // ในสถานการณ์จริงนี่จะเป็น API call
    this.cachedUsers = this.cachedUsers.filter(user => user.login.uuid !== uuid);
    this.usersSubject.next(this.cachedUsers);
  }

  // รีเซ็ตกลับไปยังข้อมูลที่เก็บไว้ในแคช
  resetFilter(): void {
    this.usersSubject.next(this.cachedUsers);
  }
}
