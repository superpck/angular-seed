import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../models/user-data.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- ชื่อ -->
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="firstName">
            First Name*
          </label>
          <input 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="firstName" 
            type="text" 
            formControlName="firstName"
            placeholder="First Name">
          <p *ngIf="userForm.get('firstName')?.invalid && userForm.get('firstName')?.touched" 
             class="text-red-500 text-xs italic mt-1">
            First name is required
          </p>
        </div>
        
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="lastName">
            Last Name*
          </label>
          <input 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="lastName" 
            type="text" 
            formControlName="lastName"
            placeholder="Last Name">
          <p *ngIf="userForm.get('lastName')?.invalid && userForm.get('lastName')?.touched" 
             class="text-red-500 text-xs italic mt-1">
            Last name is required
          </p>
        </div>
        
        <!-- อีเมลและโทรศัพท์ -->
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email*
          </label>
          <input 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="email" 
            type="email" 
            formControlName="email"
            placeholder="Email">
          <p *ngIf="userForm.get('email')?.errors?.['required'] && userForm.get('email')?.touched" 
             class="text-red-500 text-xs italic mt-1">
            Email is required
          </p>
          <p *ngIf="userForm.get('email')?.errors?.['email'] && userForm.get('email')?.touched" 
             class="text-red-500 text-xs italic mt-1">
            Please enter a valid email
          </p>
        </div>
        
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="phone">
            Phone*
          </label>
          <input 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="phone" 
            type="tel" 
            formControlName="phone"
            placeholder="Phone">
          <p *ngIf="userForm.get('phone')?.invalid && userForm.get('phone')?.touched" 
             class="text-red-500 text-xs italic mt-1">
            Phone is required
          </p>
        </div>
        
        <!-- เพศและประเทศ -->
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="gender">
            Gender*
          </label>
          <select 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="gender" 
            formControlName="gender">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <p *ngIf="userForm.get('gender')?.invalid && userForm.get('gender')?.touched" 
             class="text-red-500 text-xs italic mt-1">
            Gender is required
          </p>
        </div>
        
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="country">
            Country*
          </label>
          <input 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="country" 
            type="text" 
            formControlName="country"
            placeholder="Country">
          <p *ngIf="userForm.get('country')?.invalid && userForm.get('country')?.touched" 
             class="text-red-500 text-xs italic mt-1">
            Country is required
          </p>
        </div>

        <!-- เมืองและรัฐ -->
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="city">
            City*
          </label>
          <input 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="city" 
            type="text" 
            formControlName="city"
            placeholder="City">
          <p *ngIf="userForm.get('city')?.invalid && userForm.get('city')?.touched" 
             class="text-red-500 text-xs italic mt-1">
            City is required
          </p>
        </div>
        
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="state">
            State
          </label>
          <input 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="state" 
            type="text" 
            formControlName="state"
            placeholder="State">
        </div>
      </div>
      
      <div class="flex items-center justify-end space-x-4 mt-6">
        <button 
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
          type="button"
          (click)="onCancel()">
          Cancel
        </button>
        <button 
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
          type="submit"
          [disabled]="userForm.invalid">
          {{ editMode ? 'Update' : 'Add' }} User
        </button>
      </div>
    </form>
  `
})
export class UserFormComponent implements OnInit, OnChanges {
  @Input() user: User | null = null;
  @Input() editMode = false;
  @Output() save = new EventEmitter<User>();
  @Output() cancelForm = new EventEmitter<void>();
  
  private fb = inject(FormBuilder);
  userForm!: FormGroup;
  
  ngOnInit(): void {
    this.initForm();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.userForm) {
      this.updateForm();
    }
  }
  
  private initForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      state: [''],
      uuid: [''] // ซ่อนไว้สำหรับการอัปเดต
    });
    
    this.updateForm();
  }
  
  private updateForm(): void {
    if (this.user) {
      this.userForm.patchValue({
        firstName: this.user.name.first,
        lastName: this.user.name.last,
        email: this.user.email,
        phone: this.user.phone,
        gender: this.user.gender,
        country: this.user.location.country,
        city: this.user.location.city,
        state: this.user.location.state,
        uuid: this.user.login.uuid
      });
    } else {
      this.userForm.reset();
    }
  }
  
  onSubmit(): void {
    if (this.userForm.invalid) {
      this.markFormGroupTouched(this.userForm);
      return;
    }
    
    const formValues = this.userForm.value;
    
    // สร้างหรืออัปเดตวัตถุผู้ใช้
    const userData: User = this.prepareUserData(formValues);
    
    this.save.emit(userData);
  }
  
  onCancel(): void {
    this.cancelForm.emit();
  }
  
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
  
  private prepareUserData(formValues: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    country: string;
    city: string;
    state: string;
    uuid: string;
  }): User {
    // กรณีแก้ไขผู้ใช้ที่มีอยู่
    if (this.editMode && this.user) {
      const updatedUser = { ...this.user };
      updatedUser.name.first = formValues.firstName;
      updatedUser.name.last = formValues.lastName;
      updatedUser.email = formValues.email;
      updatedUser.phone = formValues.phone;
      updatedUser.gender = formValues.gender;
      updatedUser.location.country = formValues.country;
      updatedUser.location.city = formValues.city;
      updatedUser.location.state = formValues.state;
      return updatedUser;
    }
    
    // กรณีเพิ่มผู้ใช้ใหม่
    return {
      gender: formValues.gender,
      name: {
        title: formValues.gender === 'male' ? 'Mr' : 'Ms',
        first: formValues.firstName,
        last: formValues.lastName
      },
      location: {
        street: {
          number: Math.floor(Math.random() * 1000) + 1,
          name: 'Main Street'
        },
        city: formValues.city,
        state: formValues.state,
        country: formValues.country,
        postcode: String(Math.floor(Math.random() * 90000) + 10000),
        coordinates: {
          latitude: '0',
          longitude: '0'
        },
        timezone: {
          offset: '+00:00',
          description: 'UTC'
        }
      },
      email: formValues.email,
      login: {
        uuid: this.generateUuid(),
        username: formValues.email.split('@')[0],
        password: 'password',
        salt: '',
        md5: '',
        sha1: '',
        sha256: ''
      },
      dob: {
        date: new Date().toISOString(),
        age: 30
      },
      registered: {
        date: new Date().toISOString(),
        age: 0
      },
      phone: formValues.phone,
      cell: formValues.phone,
      id: {
        name: 'ID',
        value: String(Math.floor(Math.random() * 1000000))
      },
      picture: {
        large: `https://randomuser.me/api/portraits/${formValues.gender === 'male' ? 'men' : 'women'}/${Math.floor(Math.random() * 90) + 1}.jpg`,
        medium: `https://randomuser.me/api/portraits/${formValues.gender === 'male' ? 'men' : 'women'}/${Math.floor(Math.random() * 90) + 1}.jpg`,
        thumbnail: `https://randomuser.me/api/portraits/${formValues.gender === 'male' ? 'men' : 'women'}/${Math.floor(Math.random() * 90) + 1}.jpg`
      },
      nat: 'US'
    };
  }
  
  private generateUuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
