# Forms

โปรเจคนี้มีระบบฟอร์มที่ใช้ Reactive Forms ของ Angular พร้อมกับ Tailwind CSS สำหรับสไตล์

## การใช้งาน

### 1. Import ReactiveFormsModule

ตรวจสอบให้แน่ใจว่าคุณได้ import ReactiveFormsModule ใน component ของคุณ:

```typescript
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  // ...
  imports: [
    // ...
    ReactiveFormsModule
  ],
})
export class YourComponent {
  // ...
}
```

### 2. สร้าง FormGroup

```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// ...

export class YourComponent {
  form: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['']
    });
  }
  
  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      // ดำเนินการต่อไป...
    }
  }
}
```

### 3. สร้าง HTML Form

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <!-- Input field -->
  <div class="mb-4">
    <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
    <input
      id="name"
      type="text"
      formControlName="name"
      class="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      [ngClass]="{'border-red-500': form.get('name')?.invalid && form.get('name')?.touched}"
    >
    <div *ngIf="form.get('name')?.invalid && form.get('name')?.touched" class="text-red-500 text-sm mt-1">
      Name is required
    </div>
  </div>
  
  <!-- Email field -->
  <div class="mb-4">
    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
    <input
      id="email"
      type="email"
      formControlName="email"
      class="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      [ngClass]="{'border-red-500': form.get('email')?.invalid && form.get('email')?.touched}"
    >
    <div *ngIf="form.get('email')?.invalid && form.get('email')?.touched" class="text-red-500 text-sm mt-1">
      <span *ngIf="form.get('email')?.hasError('required')">Email is required</span>
      <span *ngIf="form.get('email')?.hasError('email')">Please enter a valid email</span>
    </div>
  </div>
  
  <!-- Submit button -->
  <button
    type="submit"
    [disabled]="form.invalid"
    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    [ngClass]="{'opacity-50 cursor-not-allowed': form.invalid}"
  >
    Submit
  </button>
</form>
```

## คอมโพเนนต์ฟอร์มที่มีให้

โปรเจคนี้มีคอมโพเนนต์ฟอร์มที่พร้อมใช้งาน:

### Text Input

```html
<app-text-input
  label="Username"
  formControlName="username"
  [errorMessages]="{
    required: 'Username is required',
    minlength: 'Username must be at least 4 characters'
  }"
></app-text-input>
```

### Select

```html
<app-select
  label="Country"
  formControlName="country"
  [options]="countries"
  [errorMessages]="{
    required: 'Please select a country'
  }"
></app-select>
```

### Checkbox

```html
<app-checkbox
  label="I agree to the terms and conditions"
  formControlName="agree"
></app-checkbox>
```

### Radio Group

```html
<app-radio-group
  label="Gender"
  formControlName="gender"
  [options]="[
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ]"
></app-radio-group>
```

## Validators

โปรเจคนี้มี custom validators:

```typescript
import { CustomValidators } from '@app/shared/validators';

this.form = this.fb.group({
  password: ['', [Validators.required, Validators.minLength(8)]],
  confirmPassword: ['', Validators.required]
}, {
  validators: [CustomValidators.passwordsMatch('password', 'confirmPassword')]
});
```

## Form Utilities

### เรียกใช้ Validation ทั้งหมดในฟอร์ม

```typescript
markFormGroupTouched(formGroup: FormGroup) {
  Object.values(formGroup.controls).forEach(control => {
    control.markAsTouched();
    
    if ((control as FormGroup).controls) {
      this.markFormGroupTouched(control as FormGroup);
    }
  });
}

// ใช้งาน
onSubmit() {
  this.markFormGroupTouched(this.form);
  
  if (this.form.valid) {
    // ดำเนินการต่อไป...
  }
}
```
