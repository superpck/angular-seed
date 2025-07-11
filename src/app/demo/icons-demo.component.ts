import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icons-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 max-w-3xl mx-auto my-8 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-6">Emoji Icons Demo</h2>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div class="p-4 bg-green-100 rounded-lg">
          <div class="text-4xl mb-2">✅</div>
          <div class="font-medium">Success</div>
        </div>
        
        <div class="p-4 bg-red-100 rounded-lg">
          <div class="text-4xl mb-2">❌</div>
          <div class="font-medium">Error</div>
        </div>
        
        <div class="p-4 bg-yellow-100 rounded-lg">
          <div class="text-4xl mb-2">⚠️</div>
          <div class="font-medium">Warning</div>
        </div>
        
        <div class="p-4 bg-blue-100 rounded-lg">
          <div class="text-4xl mb-2">ℹ️</div>
          <div class="font-medium">Info</div>
        </div>
        
        <div class="p-4 bg-purple-100 rounded-lg">
          <div class="text-4xl mb-2">❓</div>
          <div class="font-medium">Confirm</div>
        </div>
        
        <div class="p-4 bg-gray-100 rounded-lg">
          <div class="text-4xl mb-2">⛔</div>
          <div class="font-medium">Forbidden</div>
        </div>
        
        <div class="p-4 bg-gray-100 rounded-lg">
          <div class="text-4xl mb-2">🚫</div>
          <div class="font-medium">No Entry</div>
        </div>
        
        <div class="p-4 bg-gray-100 rounded-lg">
          <div class="text-4xl mb-2">🔴</div>
          <div class="font-medium">Red Alert</div>
        </div>
      </div>
      
      <div class="mt-8">
        <h3 class="text-xl font-semibold mb-4">รายการ Emoji ที่ใช้ได้</h3>
        <div class="bg-gray-50 p-4 rounded-lg font-mono text-sm overflow-auto">
          <code>✅ ❌ ⚠️ ℹ️ ❓ ⛔ 🚫 🔴 ⭕ 📣 🔔 💡 🔄 💾 📝 🔍 🗑️ 📋 🔒 🔓</code>
        </div>
      </div>
      
      <div class="mt-8">
        <h3 class="text-xl font-semibold mb-4">ตัวอย่างปุ่ม (Button Components)</h3>
        
        <div class="bg-gray-50 p-6 rounded-lg">
          <h4 class="text-lg font-semibold mb-4">ปุ่มพื้นฐาน</h4>
          <div class="flex flex-wrap gap-4 mb-6">
            <button class="pk-button pk-button-primary">Primary</button>
            <button class="pk-button pk-button-success">Success</button>
            <button class="pk-button pk-button-warning">Warning</button>
            <button class="pk-button pk-button-error">Error</button>
            <button class="pk-button pk-button-info">Info</button>
          </div>
          
          <h4 class="text-lg font-semibold mb-4">ปุ่มแบบ Outline</h4>
          <div class="flex flex-wrap gap-4 mb-6">
            <button class="pk-button pk-button-outline pk-button-primary">Primary</button>
            <button class="pk-button pk-button-outline pk-button-success">Success</button>
            <button class="pk-button pk-button-outline pk-button-warning">Warning</button>
            <button class="pk-button pk-button-outline pk-button-error">Error</button>
            <button class="pk-button pk-button-outline pk-button-info">Info</button>
          </div>
          
          <h4 class="text-lg font-semibold mb-4">ขนาดปุ่ม</h4>
          <div class="flex flex-wrap gap-4 items-center">
            <button class="pk-button pk-button-sm pk-button-primary">Small</button>
            <button class="pk-button pk-button-primary">Default</button>
            <button class="pk-button pk-button-lg pk-button-primary">Large</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class IconsDemoComponent {
}
