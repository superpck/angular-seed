# Angular 20 Seed Project

Modern Angular application template with Tailwind CSS and pre-built UI components.

## Features

- ⚡ **Angular 20** with TypeScript & Standalone Components
- 🎨 **Tailwind CSS 3** for styling
- 📱 **Responsive Design** with PK Grid System
- 🔔 **Notification System** (Toastr & Alert Modals)
- � **Pre-built Components** (Buttons, Cards, Modals)
- 🔐 **Authentication** with route guards

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
│   ├── demo/           # Component demonstrations
│   └── pages/          # Application pages
├── docs/               # Documentation
└── assets/            # Static assets
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
- `/icons-demo` - Icon & component showcase

## Login Credentials

- **Username:** `admin` or `user`
- **Password:** `password`
