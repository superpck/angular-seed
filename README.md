# Angular Seed Project version 20.1.1 - 2025.07.12-6


Modern Angular application template with Tailwind CSS and pre-built UI components.

## What's New (20.1.1)

- Fixed: Login now redirects to /home after successful authentication
- Improved: User profile dropdown menu (hover/click behavior, UI)
- UI: Minor style fixes for navigation and dropdown

## Features

- ⚡ [**Angular 20**](https://angular.dev/) with TypeScript & Standalone Components
- 🎨 [**Tailwind CSS 3**](https://tailwindcss.com/) for styling
- 📱 **Responsive Design** with PK Grid System
- 📍 **PK Breadcrumbs System** with navigation & icons
- 🏷️ **PK Badges System** with icon support
- 🃏 **Card System** with variants and responsive layouts
- 🔔 **Notification System** (Toastr & Alert Modals)
- 🧩 **Pre-built Components** (Buttons, Modals)
- 🚀 **Drag & Drop System** with cross-window support
- 🔐 **Authentication** with route guards
- 🦶 **Footer Component** with modern styling
- 📦 **Type-safe APIs** with TypeScript interfaces
- 🔄 **State Management** with Angular Signals

Modern Angular application template with Tailwind CSS and pre-built UI components.

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
│   │   ├── services/    # Services (Auth, Toastr, etc.)
│   │   └── styles/      # Global styles & grid system
│   ├── demo/            # Component demonstrations
│   ├── pages/           # Application pages
│   ├── layout/          # Layout components (Nav, Footer, etc.)
│   └── models/          # TypeScript interfaces & models
├── docs/                # Documentation
└── assets/              # Static assets
    ├── images/          # Images and icons
    └── data/            # JSON mock data
```

## Documentation

- 📖 **[Complete Manual](./docs/manual.md)** - Comprehensive guide
- 🧩 **[Components](./docs/components/)** - UI component docs
- ⚙️ **[Services](./docs/services/)** - Service documentation
- 📋 **[Changelog](./CHANGELOG.md)** - Version history

## Demo Pages

- `/login` - Authentication
- `/users` - User management with CRUD operations
- `/toastr-demo` - Toast notifications
- `/alert-demo` - Alert modals
- `/modal-demo` - Modal windows
- `/grid-demo` - Grid system examples
- `/badges-demo` - Badge components showcase
- `/drag-drop-demo` - Drag & drop functionality
- `/icons-demo` - Icon & component showcase

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
