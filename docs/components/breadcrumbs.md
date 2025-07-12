# PK Breadcrumbs Component Documentation

## Overview

The PK Breadcrumbs component provides a comprehensive breadcrumb navigation system with multiple styling variants, icon support, and accessibility features. It follows semantic HTML standards and includes responsive design patterns.

## Features

- **Multiple Styling Variants**: Background, colored, and large size options
- **Icon Support**: Easy integration of icons within breadcrumb items
- **Accessibility Compliant**: ARIA labels, semantic HTML, keyboard navigation
- **Responsive Design**: Mobile-friendly with proper text wrapping
- **Hover Effects**: Interactive visual feedback
- **Active State Management**: Clear indication of current page

## Basic Usage

### HTML Structure

```html
<nav class="pk-breadcrumbs" aria-label="Breadcrumb navigation">
  <ol class="pk-breadcrumb-list">
    <li class="pk-breadcrumb-item">
      <button type="button" class="pk-breadcrumb-link" (click)="navigateTo('/home')">
        Home
      </button>
    </li>
    <li class="pk-breadcrumb-item">
      <button type="button" class="pk-breadcrumb-link" (click)="navigateTo('/products')">
        Products
      </button>
    </li>
    <li class="pk-breadcrumb-item">
      <span class="pk-breadcrumb-text pk-breadcrumb-active">
        Product Details
      </span>
    </li>
  </ol>
</nav>
```

### Angular Component Example

```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface BreadcrumbItem {
  text: string;
  path?: string;
  isActive?: boolean;
}

@Component({
  selector: 'app-my-page',
  template: `
    <nav class="pk-breadcrumbs" aria-label="Page navigation">
      <ol class="pk-breadcrumb-list">
        <li class="pk-breadcrumb-item" *ngFor="let item of breadcrumbs">
          <button 
            *ngIf="item.path && !item.isActive; else textSpan"
            type="button"
            class="pk-breadcrumb-link"
            (click)="navigateTo(item.path)"
            [attr.aria-label]="'Navigate to ' + item.text">
            {{ item.text }}
          </button>
          <ng-template #textSpan>
            <span class="pk-breadcrumb-text" [class.pk-breadcrumb-active]="item.isActive">
              {{ item.text }}
            </span>
          </ng-template>
        </li>
      </ol>
    </nav>
  `
})
export class MyPageComponent {
  breadcrumbs: BreadcrumbItem[] = [
    { text: 'Home', path: '/home' },
    { text: 'Products', path: '/products' },
    { text: 'Current Page', isActive: true }
  ];

  constructor(private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
```

## CSS Classes Reference

### Base Classes

| Class | Description |
|-------|-------------|
| `.pk-breadcrumbs` | Base breadcrumb container |
| `.pk-breadcrumb-list` | Ordered list for breadcrumb items |
| `.pk-breadcrumb-item` | Individual breadcrumb item container |
| `.pk-breadcrumb-link` | Clickable breadcrumb links |
| `.pk-breadcrumb-text` | Non-clickable breadcrumb text |
| `.pk-breadcrumb-active` | Active/current page indicator |
| `.pk-breadcrumb-icon` | Icon container within breadcrumbs |

### Styling Variants

| Class | Description |
|-------|-------------|
| `.pk-breadcrumbs-background` | Background styling with subtle border |
| `.pk-breadcrumbs-colored` | Colored accent with primary theme colors |
| `.pk-breadcrumbs-large` | Larger text and spacing for prominence |

## Styling Variants

### 1. Basic Breadcrumbs

```html
<nav class="pk-breadcrumbs" aria-label="Basic navigation">
  <!-- breadcrumb items -->
</nav>
```

### 2. Background Style

```html
<nav class="pk-breadcrumbs pk-breadcrumbs-background" aria-label="Background navigation">
  <!-- breadcrumb items -->
</nav>
```

### 3. Colored Style

```html
<nav class="pk-breadcrumbs pk-breadcrumbs-colored" aria-label="Colored navigation">
  <!-- breadcrumb items -->
</nav>
```

### 4. Large Size

```html
<nav class="pk-breadcrumbs pk-breadcrumbs-large" aria-label="Large navigation">
  <!-- breadcrumb items -->
</nav>
```

## Icon Integration

### Using Emoji Icons

```html
<li class="pk-breadcrumb-item">
  <button type="button" class="pk-breadcrumb-link" (click)="navigateTo('/dashboard')">
    <span class="pk-breadcrumb-icon">🏠</span>
    Dashboard
  </button>
</li>
```

### Using SVG Icons

```html
<li class="pk-breadcrumb-item">
  <button type="button" class="pk-breadcrumb-link" (click)="navigateTo('/users')">
    <span class="pk-breadcrumb-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    </span>
    Users
  </button>
</li>
```

## Accessibility Features

### ARIA Support

- **`aria-label`**: Provides accessible names for navigation landmarks
- **`role="button"`**: Implicit role for button elements
- **Semantic HTML**: Uses `nav`, `ol`, and `li` elements properly

### Keyboard Navigation

- **Tab Navigation**: All interactive elements are keyboard accessible
- **Enter/Space**: Activates breadcrumb links
- **Screen Reader Support**: Proper announcement of navigation structure

### Example with Full Accessibility

```html
<nav class="pk-breadcrumbs" aria-label="Breadcrumb navigation" role="navigation">
  <ol class="pk-breadcrumb-list">
    <li class="pk-breadcrumb-item">
      <button 
        type="button" 
        class="pk-breadcrumb-link"
        (click)="navigateTo('/home')"
        aria-label="Navigate to Home page">
        Home
      </button>
    </li>
    <li class="pk-breadcrumb-item">
      <span class="pk-breadcrumb-text pk-breadcrumb-active" aria-current="page">
        Current Page
      </span>
    </li>
  </ol>
</nav>
```

## Best Practices

### 1. Navigation Structure

- Always use semantic HTML (`nav`, `ol`, `li`)
- Include proper ARIA labels for accessibility
- Use buttons for clickable items, spans for static text

### 2. Active State Management

- Mark the current page with `pk-breadcrumb-active` class
- Add `aria-current="page"` to the active item
- Never make the current page clickable

### 3. Icon Usage

- Keep icons simple and recognizable
- Ensure sufficient color contrast
- Provide alternative text when necessary

### 4. Responsive Design

- Test on various screen sizes
- Consider truncation for very long paths
- Ensure touch targets are appropriately sized

### 5. Performance

- Use efficient icon systems (SVG sprites, icon fonts)
- Avoid deep nesting in breadcrumb structures
- Implement lazy loading for dynamic breadcrumbs

## Customization

### Color Customization

The breadcrumb system uses CSS custom properties for easy theming:

```scss
:root {
  --pk-breadcrumb-text-color: #6b7280;
  --pk-breadcrumb-link-color: #3b82f6;
  --pk-breadcrumb-active-color: #1f2937;
  --pk-breadcrumb-hover-color: #2563eb;
  --pk-breadcrumb-separator-color: #d1d5db;
}
```

### Custom Separators

Override the separator style:

```scss
.pk-breadcrumb-item::after {
  content: "›"; // Custom separator
  // or use an icon
  content: "→";
}
```

## Integration with Angular Router

### Automatic Breadcrumb Generation

```typescript
import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  getBreadcrumbs() {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.buildBreadcrumbs(this.activatedRoute.root))
    );
  }

  private buildBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: any[] = []): any[] {
    // Implementation for building breadcrumbs from route data
    // Return array of breadcrumb objects
  }
}
```

## Troubleshooting

### Common Issues

1. **Separators not showing**: Ensure proper CSS import
2. **Click handlers not working**: Use button elements instead of spans
3. **Accessibility warnings**: Add proper ARIA labels and semantic HTML
4. **Styling conflicts**: Check CSS specificity and import order

### Debug Tips

- Use browser dev tools to inspect CSS classes
- Test with screen readers for accessibility
- Verify keyboard navigation functionality
- Check responsive behavior on different devices

## Related Components

- [PK Badges](./badges.md) - For status indicators
- [Navigation Menu](../navigation.md) - For main site navigation
- [Footer Component](../footer.md) - For page footer links

This documentation provides comprehensive guidance for implementing and customizing the PK Breadcrumbs component system.
