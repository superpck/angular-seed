# Angular Seed Project version 20.1.0 - 2025.07.12-7

Modern Angular application template with Tailwind CSS, advanced UI components, and professional navigation system.

## What's New (20.1.0 - 2025.07.12-7)

### 🆕 **Major Updates**
- **NEW**: Advanced Tab Component System (PK-Tabs) with overflow handling
- **NEW**: Professional Navigation Layout with collapsible sidebar
- **FIXED**: Z-index management and click event handling
- **IMPROVED**: Layout structure with proper nav-wrapper and content separation
- **ENHANCED**: Responsive design for all screen sizes

### 🔧 **Technical Improvements**
- Fixed: Buttons under collapsed sidebar now clickable
- Improved: Side navigation click handling after collapse/expand
- Enhanced: Z-index hierarchy management (Nav: 50, Content: 9999 when collapsed)
- Added: Pointer-events management for better UX
- Restructured: App layout with nav-wrapper and main-content-wrapper

## Features

- ⚡ [**Angular 20**](https://angular.dev/) with TypeScript & Standalone Components
- 🎨 [**Tailwind CSS 3**](https://tailwindcss.com/) for styling
- 📱 **Responsive Design** with advanced layout management
- 🗂️ **Advanced Tab System** (PK-Tabs) with overflow handling (scroll, dropdown, new-line)
- 🧭 **Professional Navigation** with collapsible sidebar and responsive design
- 📍 **PK Breadcrumbs System** with navigation & icons
- 🏷️ **PK Badges System** with icon support
- 🃏 **Card System** with variants and responsive layouts
- 🔔 **Notification System** (Toastr & Alert Modals)
- 🧩 **Pre-built Components** (Buttons, Modals, Tabs)
- 🚀 **Drag & Drop System** with cross-window support
- 🔐 **Authentication** with route guards
- 🦶 **Footer Component** with modern styling
- 📦 **Type-safe APIs** with TypeScript interfaces
- 🔄 **State Management** with Angular Signals
- 🎯 **Z-index Management** with proper layering system

## Author & Repository

- **Author**: [SuprPCK](https://github.com/superpck)
- **Repository**: [https://github.com/superpck/angular-seed](https://github.com/superpck/angular-seed)
- **Assisted by**: [GitHub Copilot](https://github.com/features/copilot)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

## Project Structure

```
src/
├── app/
│   ├── shared/          # Reusable components & services
│   │   ├── components/  # UI components (Modal, Alert, etc.)
│   │   ├── tabs/        # PK-Tabs system (pk-tabs, pk-tab components)
│   │   ├── services/    # Services (Auth, Toastr, Modal, etc.)
│   │   └── styles/      # Global styles & grid system
│   ├── demo/            # Component demonstrations
│   ├── pages/           # Application pages
│   ├── nav/             # Navigation system (NavComponent)
│   ├── footer/          # Footer component
│   └── models/          # TypeScript interfaces & models
├── docs/                # Documentation
└── assets/              # Static assets
    ├── images/          # Images and icons
    └── data/            # JSON mock data
```

## Key Components

### 🗂️ **PK-Tabs System**
Advanced tab component with multiple overflow handling strategies:

```typescript
// Basic usage
<app-pk-tabs overflow="dropdown" [showAddButton]="true" 
             (tabChange)="onTabChange($event)"
             (tabClose)="onTabClose($event)"
             (addTab)="onAddTab()">
  <app-pk-tab title="Dashboard" [active]="true" theme="primary">
    <h3>Dashboard Content</h3>
    <p>Main dashboard with statistics and charts.</p>
  </app-pk-tab>
  
  <app-pk-tab title="Settings" [isClose]="true" theme="warn">
    <h3>Settings Panel</h3>
    <p>Application configuration and preferences.</p>
  </app-pk-tab>
  
  <app-pk-tab title="Reports" theme="success">
    <!-- Custom title template -->
    <ng-template #titleTemplate>
      <i class="icon-chart"></i>
      <span>Reports</span>
      <span class="badge bg-green-500 text-white text-xs px-1 rounded">5</span>
    </ng-template>
    
    <h3>Reports & Analytics</h3>
    <p>Detailed reports and data visualization.</p>
  </app-pk-tab>
</app-pk-tabs>

// Overflow handling types
type TabOverflowType = 'scroll' | 'dropdown' | 'new-line';

// Theme options  
type TabTheme = 'primary' | 'warn' | 'success' | 'error';
```

**Key Features:**
- **Smart Overflow Handling**: Automatically handles many tabs with 3 strategies
  - `scroll`: Horizontal scrolling with thin scrollbar
  - `dropdown`: Overflow tabs in dropdown menu with window boundary detection
  - `new-line`: Wrap tabs to new lines for multi-row layout
- **Interactive Tabs**: Closeable tabs with event handling
- **Visual Themes**: 4 built-in themes with proper color schemes
- **Responsive Design**: Works perfectly on all screen sizes
- **Advanced Z-Index**: Proper layering that works with navigation system
- **Accessibility**: Full keyboard navigation and screen reader support
- **Custom Templates**: Support for complex tab titles with icons and badges

### 🧭 **Navigation System**
Professional sidebar navigation with:
- Collapsible sidebar (desktop: 250px → 60px)
- Mobile-responsive overlay menu
- Submenu support with animations
- User profile dropdown
- Proper z-index hierarchy (nav: 50, content: 9999 when collapsed)

### 🎯 **Layout Architecture**
```html
<nav-wrapper>           <!-- z-index: 50 -->
  <app-nav>
</nav-wrapper>
<main-content-wrapper>  <!-- Dynamic padding based on nav state -->
  <div class="content">  <!-- z-index: 9999 when nav collapsed -->
```

## Documentation

- 📖 **[Complete Manual](./docs/manual.md)** - Comprehensive guide
- 🧩 **[Components](./docs/components/)** - UI component docs
  - 🗂️ **[PK-Tabs System](./docs/components/PK-TABS.md)** - Complete tab documentation
  - ⚡ **[PK-Tabs Quick Reference](./docs/components/PK-TABS-QUICK-REF.md)** - Quick API reference
  - 🧭 **[Navigation System](./docs/components/navigation.md)** - Navigation documentation
- ⚙️ **[Services](./docs/services/)** - Service documentation
- 🔧 **[Technical Fixes](./docs/TECHNICAL-FIXES.md)** - Technical improvements & fixes
- 📋 **[Changelog](./CHANGELOG.md)** - Version history

## Demo Pages & Features Showcase

### 🏠 **Core Application**
- `/login` - Authentication system with route guards
- `/home` - Dashboard with responsive navigation demo

### 🗂️ **PK-Tabs System Showcase** ⭐
- `/tabs-demo` - **FEATURED**: Complete Tab System demonstration
  - All overflow strategies (scroll, dropdown, new-line)
  - Interactive tab creation, deletion, and management  
  - Theme variations and custom styling examples
  - Responsive behavior testing
  - Performance with many tabs (50+ tabs demo)
  - Integration with forms and complex content

### 🧩 **UI Components Gallery**
- `/modal-demo` - Modal windows with size variants
- `/alert-demo` - Alert notifications and confirmations
- `/toastr-demo` - Toast notifications system
- `/badges-demo` - Badge components with icons
- `/grid-demo` - Responsive grid system examples
- `/drag-drop-demo` - Advanced drag & drop functionality
- `/icons-demo` - Icon library and component showcase

### 👥 **Application Features**
- `/users` - Complete CRUD operations with data management

## Technical Specifications

### Z-Index Management
```scss
// Z-index hierarchy
Navigation:     50    // Always on top
Dropdown Menu:  150   // Above navigation
Content:        10    // Normal layer
Content (Nav Collapsed): 9999  // Above collapsed nav
Tab Components: 100-1000  // Proper layering
```

### Responsive Breakpoints
- **Mobile**: < 768px (overlay navigation)
- **Tablet**: 768px - 1024px (responsive adjustments)
- **Desktop**: > 1024px (full sidebar navigation)

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Login Credentials

- **Username:** `admin` or `user`
- **Password:** `password`

## Author & Repository

- **Repository:** [https://github.com/superpck/angular-seed](https://github.com/superpck/angular-seed)
- **Author:** [superpck](https://github.com/superpck)
- **License:** [MIT](./LICENSE)
- **Assisted by:** [GitHub Copilot](https://github.com/features/copilot)

## Support

หากพบปัญหาหรือมีข้อเสนอแนะ สามารถสร้าง issue ได้ที่:
- 🐛 **[Issues](https://github.com/superpck/angular-seed/issues)**
- 💡 **[Feature Requests](https://github.com/superpck/angular-seed/issues/new?template=feature_request.md)**

## Contribute

ยินดีต้อนรับผู้ที่ต้องการช่วยพัฒนาโปรเจคนี้:
1. Fork repository
2. สร้าง branch ใหม่: `git checkout -b feature/your-feature-name`
3. Commit การเปลี่ยนแปลง: `git commit -m 'Add some feature'`
4. Push ไปยัง branch: `git push origin feature/your-feature-name`
5. ส่ง Pull Request
