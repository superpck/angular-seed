import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-grid-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-demo.component.html',
  styleUrls: ['./grid-demo.component.scss']
})
export class GridDemoComponent {
  private router = inject(Router);
  
  title = 'PK Grid System Demo';
  
  examples = [
    {
      title: 'Basic 12 Column Grid',
      description: 'แสดงการใช้งาน grid system พื้นฐาน 12 คอลัมน์'
    },
    {
      title: 'Responsive Layout',
      description: 'แสดงการปรับเปลี่ยนขนาดคอลัมน์ตามขนาดหน้าจอ'
    },
    {
      title: 'Mixed Column Sizes',
      description: 'แสดงการใช้คอลัมน์ขนาดต่างๆ ในแถวเดียวกัน'
    }
  ];

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}
