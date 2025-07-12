# Navigation System

Professional navigation system with collapsible sidebar, responsive design, and advanced z-index management.

## Overview

The navigation system consists of:
- **Top Navigation**: Fixed header with logo and user profile dropdown
- **Side Navigation**: Collapsible sidebar with menu items and submenus
- **Content Layout**: Responsive content area that adjusts to navigation state

## Architecture

```html
<div class="app-container">
  <div class="nav-wrapper">           <!-- z-index: 50 -->
    <app-nav (sideNavCollapsedChange)="sideNavCollapsed = $event"></app-nav>
  </div>
  
  <div class="main-content-wrapper" [class.collapsed-nav]="sideNavCollapsed">
    <div class="content">             <!-- z-index: 9999 when nav collapsed -->
      <router-outlet></router-outlet>
    </div>
  </div>
</div>
```

## Key Features

### ✅ **Advanced Click Event Management**
- **Problem Solved**: Buttons under collapsed sidebar couldn't be clicked
- **Solution**: Strategic z-index hierarchy and pointer-events management
- **Result**: All interactive elements remain clickable regardless of navigation state

### ✅ **Responsive Design**
- **Desktop (≥1024px)**: Persistent sidebar navigation (250px → 60px when collapsed)
- **Mobile (<1024px)**: Overlay navigation with backdrop
- **Smooth CSS transitions** between all states

### ✅ **Smart Z-Index Hierarchy**
```scss
Navigation Base:        50      // Always on top
Navigation Dropdowns:   150     // Above navigation
Content Normal:         10      // Standard layer
Content (Nav Collapsed): 9999   // Above collapsed nav
Tab Components:         100-1000 // Proper component layering
```

### ✅ **Professional User Experience**
- Collapsible sidebar with icon-only mode
- User profile dropdown with hover/click behavior
- Submenu support with smooth animations
- Keyboard navigation and accessibility support

## Navigation States

### 1. Desktop - Expanded (Default)
- Sidebar: 250px width with full menu text
- Content: `padding-left: 250px`
- Z-index: Standard hierarchy

### 2. Desktop - Collapsed  
- Sidebar: 60px width with icons only
- Content: `padding-left: 80px` and `z-index: 9999`
- Submenus: Absolute positioned to the right

### 3. Mobile - Hidden (Default)
- Sidebar: `left: -250px` (hidden)
- Content: Full width with top padding only

### 4. Mobile - Open
- Sidebar: `left: 0` (slide in)
- Overlay: Semi-transparent backdrop
- Content: Dimmed with scroll lock

## Component API

### NavComponent Outputs
```typescript
@Output() sideNavCollapsedChange = new EventEmitter<boolean>();
```

### Menu Configuration
```typescript
interface MenuItem {
  label: string;         // Display name
  icon: string;          // SVG path data
  route?: string;        // Navigation route
  children?: MenuItem[]; // Submenu items
  expanded?: boolean;    // Submenu state
}
```

### Example Menu Setup
```typescript
menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    route: '/home',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
  },
  {
    label: 'Components',
    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    children: [
      { label: 'Tabs Demo', route: '/tabs-demo', icon: '...' },
      { label: 'Modal Demo', route: '/modal-demo', icon: '...' },
      { label: 'Alert Demo', route: '/alert-demo', icon: '...' }
    ]
  }
];
```

## Critical Z-Index Fix

### The Problem
Before the fix, buttons positioned under the collapsed sidebar area couldn't be clicked, causing frustrating UX issues.

### The Solution
```typescript
// In app.html
<div class="content" 
     [style.z-index]="sideNavCollapsed ? '9999' : '10'"
     [style.pointer-events]="'auto'">
  <div class="content-wrapper" 
       [style.z-index]="sideNavCollapsed ? '9999' : '15'">
    <!-- Content that needs to be clickable -->
  </div>
</div>
```

```scss
// In nav.component.scss
.side-nav.collapsed {
  width: 60px;
  
  // Interactive elements remain clickable
  .menu-item,
  .collapse-button-container {
    position: relative;
    z-index: 30;
  }
}
```

### Result
- ✅ Navigation elements remain fully functional
- ✅ Content under collapsed nav is now clickable
- ✅ No interference between nav and content interactions
- ✅ Smooth transitions without click event loss

## การปรับแต่ง

คุณสามารถปรับแต่งสไตล์ได้ใน `nav.component.scss` โดยใช้ Tailwind CSS utilities หรือ SCSS โดยตรง
