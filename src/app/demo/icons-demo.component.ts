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
      
      <div class="mt-8">
        <h3 class="text-xl font-semibold mb-4">ตัวอย่างการ์ด (Card Components)</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <!-- Default Card -->
          <div class="pk-card">
            <div class="pk-card-header">
              <h3 class="pk-card-header-title">การ์ดพื้นฐาน</h3>
            </div>
            <div class="pk-card-body">
              <p>เนื้อหาของการ์ดพื้นฐาน สามารถใส่ข้อความหรือคอมโพเนนต์อื่นๆ ได้ตามต้องการ</p>
            </div>
            <div class="pk-card-footer">
              <div class="flex justify-end">
                <button class="pk-button pk-button-primary">ตกลง</button>
              </div>
            </div>
          </div>
          
          <!-- Primary Card -->
          <div class="pk-card pk-card-primary">
            <div class="pk-card-header">
              <h3 class="pk-card-header-title">การ์ด Primary</h3>
            </div>
            <div class="pk-card-body">
              <p>เนื้อหาของการ์ด primary มีการเน้นสีตามประเภท</p>
            </div>
            <div class="pk-card-footer">
              <div class="flex justify-end">
                <button class="pk-button pk-button-primary">ตกลง</button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Success Card -->
          <div class="pk-card pk-card-success">
            <div class="pk-card-header">
              <h3 class="pk-card-header-title">Success</h3>
            </div>
            <div class="pk-card-body">
              <p>การ์ด success</p>
            </div>
            <div class="pk-card-footer">
              <button class="pk-button pk-button-sm pk-button-success">ตกลง</button>
            </div>
          </div>
          
          <!-- Warning Card -->
          <div class="pk-card pk-card-warning">
            <div class="pk-card-header">
              <h3 class="pk-card-header-title">Warning</h3>
            </div>
            <div class="pk-card-body">
              <p>การ์ด warning</p>
            </div>
            <div class="pk-card-footer">
              <button class="pk-button pk-button-sm pk-button-warning">ตกลง</button>
            </div>
          </div>
          
          <!-- Error Card -->
          <div class="pk-card pk-card-error">
            <div class="pk-card-header">
              <h3 class="pk-card-header-title">Error</h3>
            </div>
            <div class="pk-card-body">
              <p>การ์ด error</p>
            </div>
            <div class="pk-card-footer">
              <button class="pk-button pk-button-sm pk-button-error">ตกลง</button>
            </div>
          </div>
        </div>
        
        <h4 class="text-lg font-semibold mt-6 mb-4">ขนาดของการ์ด</h4>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Small Card -->
          <div class="pk-card pk-card-sm pk-card-info">
            <div class="pk-card-header">
              <h3 class="pk-card-header-title">Small Card</h3>
            </div>
            <div class="pk-card-body">
              <p>การ์ดขนาดเล็ก</p>
            </div>
            <div class="pk-card-footer">
              <button class="pk-button pk-button-sm pk-button-info">ตกลง</button>
            </div>
          </div>
          
          <!-- Default Card -->
          <div class="pk-card pk-card-info">
            <div class="pk-card-header">
              <h3 class="pk-card-header-title">Default Card</h3>
            </div>
            <div class="pk-card-body">
              <p>การ์ดขนาดปกติ</p>
            </div>
            <div class="pk-card-footer">
              <button class="pk-button pk-button-info">ตกลง</button>
            </div>
          </div>
          
          <!-- Large Card -->
          <div class="pk-card pk-card-lg pk-card-info">
            <div class="pk-card-header">
              <h3 class="pk-card-header-title">Large Card</h3>
            </div>
            <div class="pk-card-body">
              <p>การ์ดขนาดใหญ่</p>
            </div>
            <div class="pk-card-footer">
              <button class="pk-button pk-button-lg pk-button-info">ตกลง</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class IconsDemoComponent {
}
