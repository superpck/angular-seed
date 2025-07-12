import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-badges-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badges-demo.component.html',
  styleUrls: ['./badges-demo.component.scss']
})
export class BadgesDemoComponent {
  private router = inject(Router);

  badges = [
    { text: 'Default', icon: '📝', type: 'default' },
    { text: 'Primary', icon: '🔵', type: 'primary' },
    { text: 'Success', icon: '✅', type: 'success' },
    { text: 'Warning', icon: '⚠️', type: 'warning' },
    { text: 'Error', icon: '❌', type: 'error' },
    { text: 'Info', icon: 'ℹ️', type: 'info' },
    { text: 'Dark', icon: '⚫', type: 'dark' },
    { text: 'Light', icon: '⚪', type: 'light' }
  ];
  
  statusBadges = [
    { text: 'Online', icon: '🟢', type: 'success' },
    { text: 'Offline', icon: '🔴', type: 'error' },
    { text: 'Away', icon: '🟡', type: 'warning' },
    { text: 'Busy', icon: '🟠', type: 'error' },
    { text: 'Available', icon: '✅', type: 'success' }
  ];
  
  notificationBadges = [
    { text: '12', icon: '📧', type: 'primary', label: 'Messages' },
    { text: '5', icon: '🔔', type: 'warning', label: 'Notifications' },
    { text: '99+', icon: '❗', type: 'error', label: 'Alerts' },
    { text: 'New', icon: '⭐', type: 'info', label: 'Features' }
  ];
  
  removeBadge(index: number, array: Array<{text: string; icon: string; type: string; label?: string}>): void {
    array.splice(index, 1);
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}
