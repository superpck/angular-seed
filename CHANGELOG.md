# Changelog

รายการเปลี่ยนแปลงทั้งหมดของโปรเจคนี้จะถูกบันทึกไว้ในไฟล์นี้

รูปแบบของ changelog นี้อ้างอิงตาม [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
และโปรเจคนี้ยึดหลัก [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

## [Unreleased]

### เพิ่มใหม่
- ระบบ PK Grid System
  - Grid System แบบ CSS Grid สำหรับการจัดเลย์เอาต์แบบ responsive
  - รองรับ 12 column grid layout พร้อม breakpoints
  - Classes สำหรับ responsive design: pk-col-(1-12), pk-col-sm-(1-12), pk-col-md-(1-12), pk-col-lg-(1-12), pk-col-xl-(1-12)
  - รองรับการปรับระยะห่าง: pk-row-gap-(0,1,2,3,4,5,6,8)
  - รองรับการจัดตำแหน่งคอลัมน์: pk-col-start-(1-12), pk-col-end-(1-13)
  - Responsive breakpoints: sm (640px+), md (768px+), lg (1024px+), xl (1280px+)
- หน้า Grid Demo แสดงตัวอย่างการใช้งาน grid system
- ระบบ Modal Component (pk-modal)
  - แสดง popup window ที่ปรับแต่งได้หลากหลาย
  - รองรับหลายขนาด: sm, md, lg, xl, 2xl, full
  - สามารถตั้งค่าการปิด: ปุ่ม X, คลิกพื้นหลัง, กดปุ่ม ESC
  - รองรับการส่งข้อมูลระหว่าง component ผ่าน data และ onClose
  - มีการล็อคพื้นหลัง (fixed background) เมื่อ modal เปิด
- ระบบ Alert Component กับการล็อคพื้นหลัง
  - ป้องกันการ scroll พื้นหลังเมื่อ alert แสดง
  - กลับไปยังตำแหน่งเดิมเมื่อปิด alert
- ระบบ CSS Components พื้นฐาน
  - `pk-button` พร้อมสี (primary, success, warning, error, info)
  - `pk-button-outline` สำหรับปุ่มแบบเส้นขอบ
  - `pk-button-sm` และ `pk-button-lg` สำหรับปุ่มขนาดเล็กและใหญ่
  - `pk-card` พร้อม header, body และ footer
  - `pk-card-sm` และ `pk-card-lg` สำหรับการ์ดขนาดเล็กและใหญ่
  - สีหลากหลายของการ์ด (primary, success, warning, error, info)
- หน้า Modal Demo แสดงตัวอย่างการใช้งาน modal ในขนาดต่างๆ
- หน้า Icons Demo แสดงตัวอย่าง emoji และ CSS components

### ปรับปรุง
- ปรับปรุงหน้า User Management ให้ใช้ Modal component สำหรับการแก้ไขและเพิ่มข้อมูล
- ปรับปรุงหน้า User Management ให้ใช้ CSS components ใหม่
- ปรับปรุงหน้า Alert Demo และ Toastr Demo ให้ใช้ปุ่มใหม่

## [0.2.0] - 2025-07-12

### เพิ่มใหม่
- ระบบการแจ้งเตือนแบบ Toastr
  - แสดงข้อความแจ้งเตือนชั่วคราวที่มุมบนขวาของหน้าจอ
  - รองรับประเภท success, error, warning, info
  - มีไอคอน emoji สำหรับแต่ละประเภท
  - สามารถปิดได้โดยคลิกที่ X หรือรอให้หายไปเอง
- ระบบ Alert Modal
  - แสดงกล่องข้อความตรงกลางหน้าจอพร้อม backdrop
  - รองรับประเภท success, error, warning, info, confirm
  - มีไอคอน emoji สำหรับแต่ละประเภท
  - มีปุ่มตกลงและยกเลิกสำหรับ confirm dialog
- หน้าตัวอย่างสำหรับทดสอบ Toastr และ Alert

### ปรับปรุง
- ปรับปรุง Navigation ให้รองรับหน้าตัวอย่างใหม่

## [0.1.0] - 2025-07-11

### เพิ่มใหม่
- โครงสร้างพื้นฐานของโปรเจค Angular
- หน้า Login
- หน้า Home
- หน้า User Management
  - ฟังก์ชันการค้นหา, เพิ่ม, แก้ไข, ลบข้อมูลผู้ใช้
  - การจัดการแสดงผลแบบแบ่งหน้า
- ระบบ Authentication
  - การตรวจสอบสิทธิ์การเข้าถึงหน้าต่างๆ
  - การบันทึกข้อมูลผู้ใช้ที่ล็อกอินในปัจจุบัน

### ปรับปรุง
- ใช้ Tailwind CSS สำหรับการจัดการ UI
- ใช้ Standalone Components ของ Angular
- ใช้ Signal API สำหรับการจัดการ State
