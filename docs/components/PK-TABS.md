# PK-Tabs Component System

Advanced tab component system with professional overflow handling and responsive design.

## Overview

The PK-Tabs system consists of two main components:
- `PkTabsComponent` - Container component that manages tabs and overflow
- `PkTabComponent` - Individual tab content component

## Features

- ✅ **Multiple Overflow Strategies**: scroll, dropdown, new-line
- ✅ **Closeable Tabs** with confirmation handling
- ✅ **Theme Support**: primary, warn, success, error
- ✅ **Responsive Design** with proper z-index management
- ✅ **Custom Title Templates** for advanced tab headers
- ✅ **Add Button** functionality
- ✅ **Keyboard Navigation** support
- ✅ **Window Boundary Detection** for dropdown positioning

## Basic Usage

```html
<app-pk-tabs overflow="dropdown" [showAddButton]="true">
  <app-pk-tab title="Tab 1" [active]="true">
    <h3>Content for Tab 1</h3>
    <p>This is the content of the first tab.</p>
  </app-pk-tab>
  
  <app-pk-tab title="Tab 2" [isClose]="true">
    <h3>Content for Tab 2</h3>
    <p>This tab can be closed.</p>
  </app-pk-tab>
  
  <app-pk-tab title="Tab 3" theme="success">
    <h3>Success Theme Tab</h3>
    <p>This tab uses the success theme.</p>
  </app-pk-tab>
</app-pk-tabs>
```

## Component APIs

### PkTabsComponent

#### Inputs
```typescript
@Input() overflow: TabOverflowType = 'scroll';  // 'scroll' | 'dropdown' | 'new-line'
@Input() showAddButton = false;                 // Show add new tab button
```

#### Outputs
```typescript
@Output() tabChange = new EventEmitter<number>();    // Tab selection change
@Output() tabClose = new EventEmitter<number>();     // Tab close request
@Output() addTab = new EventEmitter<void>();         // Add tab button clicked
```

#### Methods
```typescript
selectTab(index: number): void      // Programmatically select a tab
closeTab(index: number): void       // Programmatically close a tab
```

### PkTabComponent

#### Inputs
```typescript
@Input() title = '';                    // Tab title
@Input() active = false;                // Is tab active
@Input() disabled = false;              // Is tab disabled
@Input() isClose = false;               // Show close button
@Input() theme: TabTheme = 'primary';   // Theme: 'primary' | 'warn' | 'success' | 'error'
```

#### Content Projection
```typescript
@ContentChild('titleTemplate') titleTemplateRef?: TemplateRef<any>;  // Custom title template
```

## Advanced Usage

### Custom Title Templates

```html
<app-pk-tabs>
  <app-pk-tab [active]="true">
    <ng-template #titleTemplate>
      <i class="icon-user"></i>
      <span>User Profile</span>
      <span class="badge">5</span>
    </ng-template>
    
    <div>Tab content here...</div>
  </app-pk-tab>
</app-pk-tabs>
```

### Event Handling

```typescript
export class TabDemoComponent {
  onTabChange(index: number) {
    console.log('Tab changed to:', index);
  }
  
  onTabClose(index: number) {
    console.log('Tab close requested:', index);
    // Handle tab removal logic
  }
  
  onAddTab() {
    console.log('Add new tab requested');
    // Handle adding new tab
  }
}
```

```html
<app-pk-tabs 
  (tabChange)="onTabChange($event)"
  (tabClose)="onTabClose($event)" 
  (addTab)="onAddTab()"
  [showAddButton]="true">
  <!-- tabs here -->
</app-pk-tabs>
```

## Overflow Strategies

### 1. Scroll (Default)
```html
<app-pk-tabs overflow="scroll">
  <!-- Many tabs will be scrollable horizontally -->
</app-pk-tabs>
```

### 2. Dropdown
```html
<app-pk-tabs overflow="dropdown">
  <!-- Overflow tabs appear in a dropdown menu -->
</app-pk-tabs>
```

### 3. New Line
```html
<app-pk-tabs overflow="new-line">
  <!-- Tabs wrap to new lines when needed -->
</app-pk-tabs>
```

## Themes

### Available Themes
- `primary` (default) - Blue theme
- `warn` - Orange theme  
- `success` - Green theme
- `error` - Red theme

```html
<app-pk-tabs>
  <app-pk-tab title="Normal" theme="primary"></app-pk-tab>
  <app-pk-tab title="Warning" theme="warn"></app-pk-tab>
  <app-pk-tab title="Success" theme="success"></app-pk-tab>
  <app-pk-tab title="Error" theme="error"></app-pk-tab>
</app-pk-tabs>
```

## Styling Customization

### CSS Custom Properties
```scss
:root {
  --primary: #3f51b5;           // Primary theme color
  --warn: #ff9800;              // Warning theme color  
  --success: #4caf50;           // Success theme color
  --error: #f44336;             // Error theme color
  --border-color: #e0e0e0;      // Border color
}
```

### Custom Styling
```scss
.pk-tabs-container {
  // Custom container styles
}

.pk-tab-item {
  // Custom tab item styles
}

.pk-tab-item.active {
  // Custom active tab styles
}
```

## Z-Index Management

The tab system uses a hierarchical z-index system:

```scss
Main Container:     1000
Tab Items:          102
Active Tab:         103  
Close Buttons:      104
Controls:           110
Dropdown:           120
Dropdown Menu:      150
Dropdown Items:     151
```

## Responsive Behavior

### Mobile (< 1024px)
- Higher z-index values for better stacking
- Improved touch interaction
- Responsive dropdown positioning

### Desktop (≥ 1024px)
- Full feature set
- Hover effects
- Keyboard navigation

## Accessibility

- **ARIA Support**: Proper role and aria-* attributes
- **Keyboard Navigation**: Tab, Enter, Space, Escape keys
- **Screen Reader**: Descriptive labels and state announcements
- **Focus Management**: Proper focus indicators and tab order

## Browser Compatibility

- Chrome 90+
- Firefox 88+ 
- Safari 14+
- Edge 90+

## Examples

See the live demo at `/tabs-demo` in the application for interactive examples of all features.
