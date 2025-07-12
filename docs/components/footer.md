# Footer Component

Footer component เป็นส่วนท้ายของเว็บไซต์ที่แสดงข้อมูลเกี่ยวกับบริษัท, ลิงก์ด่วน, และข้อมูลติดต่อ

## การใช้งาน

Footer component ถูกรวมอยู่ใน AppComponent โดยอัตโนมัติ คุณไม่จำเป็นต้องเพิ่มมันในหน้าอื่นๆ

```html
<app-footer></app-footer>
```

## คุณสมบัติ

- **Responsive Design** - ปรับตามขนาดหน้าจอโดยอัตโนมัติ
- **Multiple Columns** - แสดงข้อมูลในหลายคอลัมน์
- **Social Links** - ลิงก์ไปยังโซเชียลมีเดียต่างๆ
- **Modern Styling** - ใช้ Glass Morphism และ Gradient Text
- **Side Nav Integration** - ปรับขนาดตาม Side Navigation
- **Dark Mode Support** - รองรับการแสดงผลในโหมด Dark Mode

## ส่วนประกอบ

Footer ประกอบด้วย:

1. **Company Section** - ข้อมูลเกี่ยวกับบริษัทและลิขสิทธิ์
2. **Quick Links** - ลิงก์ไปยังส่วนสำคัญของเว็บไซต์
3. **Technologies** - รายการเทคโนโลยีที่ใช้ในโปรเจค
4. **Contact Information** - ข้อมูลติดต่อและโซเชียลมีเดีย

## การปรับแต่ง

คุณสามารถปรับแต่งเนื้อหาได้ใน `footer.component.html` และสไตล์ใน `footer.component.scss`

### การเปลี่ยนลิงก์โซเชียลมีเดีย

```html
<div class="social-links">
  <a href="https://facebook.com/yourpage" target="_blank" class="social-icon">
    <!-- Facebook Icon -->
  </a>
  <a href="https://twitter.com/yourhandle" target="_blank" class="social-icon">
    <!-- Twitter Icon -->
  </a>
  <!-- เพิ่มลิงก์อื่นๆ ตามต้องการ -->
</div>
```

### การเปลี่ยนลิงก์ด่วน

```html
<div class="footer-links">
  <h3 class="footer-title">Quick Links</h3>
  <ul>
    <li><a routerLink="/home">Home</a></li>
    <li><a routerLink="/about">About</a></li>
    <!-- เพิ่มลิงก์อื่นๆ ตามต้องการ -->
  </ul>
</div>
```
