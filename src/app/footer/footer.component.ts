import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  links = [
    { title: 'เกี่ยวกับเรา', url: '/about' },
    { title: 'ติดต่อเรา', url: '/contact' },
    { title: 'นโยบายความเป็นส่วนตัว', url: '/privacy' },
    { title: 'เงื่อนไขการใช้งาน', url: '/terms' }
  ];
  
  socialLinks = [
    { name: 'GitHub', url: 'https://github.com/superpck/angular-seed', icon: '🐙' },
    { name: 'Angular', url: 'https://angular.io', icon: '🔴' },
    { name: 'TypeScript', url: 'https://typescriptlang.org', icon: '🔷' },
    { name: 'Tailwind CSS', url: 'https://tailwindcss.com', icon: '🎨' }
  ];
}
