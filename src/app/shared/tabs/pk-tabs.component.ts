import { 
  Component, 
  ContentChildren, 
  QueryList, 
  AfterContentInit, 
  AfterViewChecked,
  Input, 
  Output, 
  EventEmitter,
  ElementRef,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PkTabComponent } from './pk-tab.component';

export type TabOverflowType = 'scroll' | 'dropdown' | 'new-line';

@Component({
  selector: 'app-pk-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pk-tabs-container" [class]="'overflow-' + overflow">
      <div class="pk-tabs-header" #tabsHeader>
        <div class="pk-tabs-nav" [class.wrap]="overflow === 'new-line'">
          <div class="pk-tabs-scroller" [class.wrap]="overflow === 'new-line'">
            <ng-container *ngFor="let tab of tabs; let i = index">
              <button 
                class="pk-tab-item" 
                [class.active]="tab.active" 
                [class.disabled]="tab.disabled"
                [class]="'theme-' + tab.theme"
                (click)="!tab.disabled && selectTab(i)"
                (keydown.enter)="!tab.disabled && selectTab(i)"
                [attr.tabindex]="tab.disabled ? -1 : 0"
                [attr.aria-selected]="tab.active"
                role="tab"
              >
                <ng-template [ngTemplateOutlet]="tab.titleTemplateRef || defaultTabTitle" 
                            [ngTemplateOutletContext]="{ $implicit: tab }">
                </ng-template>
                
                <button *ngIf="tab.isClose" 
                        class="pk-tab-close" 
                        (click)="closeTab(i, $event)"
                        (keydown.enter)="closeTab(i, $event)"
                        aria-label="Close tab"
                        >×</button>
              </button>
            </ng-container>
          </div>
          
          <div class="pk-tabs-controls">
            <button *ngIf="showAddButton" 
                   class="pk-tab-add" 
                   (click)="addTab.emit()"
                   (keydown.enter)="addTab.emit()"
                   aria-label="Add new tab">+</button>
            
            <div *ngIf="overflow === 'dropdown'" class="pk-tabs-dropdown">
              <button class="pk-tabs-dropdown-toggle" 
                     aria-label="More tabs"
                     (click)="toggleDropdown($event)">⋮</button>
              <div class="pk-tabs-dropdown-menu" [class.show]="showDropdown" role="menu">
                <ng-container *ngFor="let tab of tabs; let i = index">
                  <button 
                    class="pk-tab-dropdown-item"
                    [class.active]="tab.active" 
                    [class.disabled]="tab.disabled"
                    (click)="!tab.disabled && selectTab(i); toggleDropdown($event)"
                    (keydown.enter)="!tab.disabled && selectTab(i); toggleDropdown($event)"
                    [attr.tabindex]="tab.disabled ? -1 : 0"
                    role="menuitem"
                  >
                    {{ getTabTitle(tab) }}
                  </button>
                </ng-container>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="pk-tabs-content" role="tabpanel">
        <ng-content></ng-content>
      </div>
    </div>
    
    <ng-template #defaultTabTitle let-tab>
      Tab
    </ng-template>
  `,
  styles: [`
    .pk-tabs-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      position: relative;
      isolation: isolate; /* Create a new stacking context */
      z-index: 1000; /* Ensure it's above the side nav */
    }
    
    .pk-tabs-header {
      display: flex;
      border-bottom: 1px solid #e0e0e0;
      position: relative;
      z-index: 2; /* Ensure header is above content */
    }
    
    .pk-tabs-nav {
      display: flex;
      position: relative;
      flex: 1;
      justify-content: space-between; /* Separate scroller from controls */
    }
    
    .pk-tabs-nav.wrap .pk-tabs-scroller {
      flex-wrap: wrap;
      max-height: none;
      overflow: visible;
    }
    
    .pk-tabs-nav.wrap .pk-tab-item {
      margin-bottom: 4px;
    }

    .pk-tabs-scroller {
      display: flex;
      flex: 1;
      overflow-x: auto;
      scrollbar-width: thin;
      max-width: calc(100% - 50px); /* Make room for controls */
      flex-wrap: nowrap;
    }
    
    .pk-tabs-controls {
      display: flex;
      align-items: center;
      position: sticky;
      right: 0;
      background: white; /* Match your background color */
      z-index: 110;
      padding-left: 8px;
      box-shadow: -5px 0 10px -5px rgba(0, 0, 0, 0.1);
      pointer-events: auto !important;
    }
    
    .pk-tab-item {
      padding: 0.75rem 1rem;
      cursor: pointer;
      user-select: none;
      display: flex;
      align-items: center;
      border-bottom: 3px solid transparent;
      margin-bottom: -1px;
      white-space: nowrap;
      background: transparent;
      border: 1px solid transparent;
      border-bottom: none;
      font-family: inherit;
      font-size: inherit;
      position: relative;
      z-index: 102;
      transition: all 0.2s ease;
      border-radius: 6px 6px 0 0;
      margin-right: 2px;
      isolation: isolate; /* Create a new stacking context */
      pointer-events: auto !important;
    }
    
    .pk-tab-item:hover {
      background-color: rgba(0, 0, 0, 0.05);
      border-color: #e0e0e0;
    }
    
    .pk-tab-item:focus {
      outline: 2px solid #3f51b5;
      outline-offset: -2px;
    }
    
    .pk-tab-item.active {
      border-color: #e0e0e0;
      border-bottom-color: #3f51b5;
      font-weight: 500;
      background-color: #fff;
      box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.05);
      z-index: 103; /* Higher z-index for active tabs */
    }
    
    .pk-tab-item.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .pk-tab-close {
      margin-left: 8px;
      background: none;
      border: none;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      line-height: 1;
      padding: 0 4px;
      border-radius: 50%;
      position: relative;
      z-index: 104; /* Higher than tab items to ensure clickability */
      color: #666;
      pointer-events: auto !important;
    }
    
    .pk-tab-close:hover {
      background-color: rgba(0, 0, 0, 0.1);
      color: #f44336;
    }
    
    .pk-tab-add {
      background: none;
      border: 1px dashed #ccc;
      border-radius: 50%;
      font-size: 20px;
      cursor: pointer;
      padding: 0 9px;
      height: 30px;
      width: 30px;
      line-height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 110; /* Higher to ensure visibility */
      color: #666;
      transition: all 0.2s ease;
      pointer-events: auto !important;
    }

    .pk-tab-add:hover {
      background-color: rgba(0, 0, 0, 0.05);
      color: #3f51b5;
      border-color: #3f51b5;
    }
    
    .pk-tabs-content {
      padding: 1rem 0;
      position: relative;
      z-index: 1; /* Lower than header */
    }
    
    /* Theme variations */
    .theme-primary.active {
      border-bottom-color: #3f51b5;
      color: #3f51b5;
      background-color: #fff;
    }
    
    .theme-warn.active {
      border-bottom-color: #ff9800;
      color: #ff9800;
      background-color: #fff;
    }
    
    .theme-success.active {
      border-bottom-color: #4caf50;
      color: #4caf50;
      background-color: #fff;
    }
    
    .theme-error.active {
      border-bottom-color: #f44336;
      color: #f44336;
      background-color: #fff;
    }
    
    /* Overflow handling */
    .overflow-scroll .pk-tabs-scroller {
      overflow-x: auto;
      scrollbar-width: thin;
    }
    
    .overflow-dropdown .pk-tabs-scroller {
      overflow: hidden;
    }
    
    .pk-tabs-dropdown {
      position: relative;
      display: inline-block;
      z-index: 120; /* Higher than other elements to ensure dropdown is visible */
    }
    
    .pk-tabs-dropdown-toggle {
      background: none;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      font-size: 18px;
      padding: 3px 8px;
      margin-left: 8px;
      cursor: pointer;
      position: relative;
      z-index: 110; /* Higher to ensure visibility */
      color: #666;
      transition: all 0.2s ease;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      pointer-events: auto !important;
    }

    .pk-tabs-dropdown-toggle:hover {
      background-color: rgba(0, 0, 0, 0.05);
      color: #3f51b5;
      border-color: #3f51b5;
    }
    
    .pk-tabs-dropdown-menu {
      display: none;
      position: absolute;
      right: 0;
      top: 100%;
      margin-top: 5px;
      background-color: white;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
      z-index: 150;
      min-width: 180px;
      border-radius: 4px;
      padding: 4px 0;
      max-height: 300px;
      overflow-y: auto;
      border: 1px solid #e0e0e0;
    }

    .pk-tabs-dropdown-menu.show {
      display: block;
      max-height: calc(80vh - 100px);
      overflow-y: auto;
    }
    
    /* Add media query for mobile adjustments */
    @media (max-width: 1024px) {
      .pk-tabs-container {
        overflow: visible; /* Ensure content doesn't get cut off */
        isolation: isolate; /* Create a new stacking context */
      }
      
      .pk-tabs-nav {
        position: relative;
        isolation: isolate; /* Create a new stacking context */
      }
      
      .pk-tab-item {
        z-index: 120; /* Higher z-index on smaller screens */
        isolation: isolate; /* Create a new stacking context */
        pointer-events: auto !important;
      }
      
      .pk-tab-close {
        z-index: 130; /* Slightly higher than tab items */
        pointer-events: auto !important;
      }
      
      .pk-tabs-controls {
        position: relative;
        z-index: 150; /* Higher than tab items */
        background: white; /* Ensure background on mobile */
        box-shadow: -5px 0 10px -5px rgba(0, 0, 0, 0.1);
        pointer-events: auto !important;
      }
    }
    
    .pk-tab-dropdown-item {
      padding: 8px 16px;
      cursor: pointer;
      background: none;
      border: none;
      text-align: left;
      width: 100%;
      font-family: inherit;
      font-size: inherit;
      transition: all 0.2s ease;
      pointer-events: auto !important;
      position: relative;
      z-index: 151;
    }
    
    .pk-tab-dropdown-item:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
    
    .pk-tab-dropdown-item.active {
      font-weight: 500;
      background-color: rgba(63, 81, 181, 0.08);
      color: #3f51b5;
    }
    
    .pk-tab-dropdown-item.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class PkTabsComponent implements AfterContentInit, AfterViewChecked {
  @ContentChildren(PkTabComponent) tabComponents!: QueryList<PkTabComponent>;
  
  @Input() overflow: TabOverflowType = 'scroll';
  @Input() showAddButton = false;
  
  @Output() tabChange = new EventEmitter<number>();
  @Output() tabClose = new EventEmitter<number>();
  @Output() addTab = new EventEmitter<void>();
  
  tabs: PkTabComponent[] = [];
  isOverflowing = false;
  showDropdown = false;
  
  private elementRef = inject(ElementRef);
  
  ngAfterContentInit() {
    this.tabs = this.tabComponents.toArray();
    
    // Set the first tab as active if none is active
    if (this.tabs.length && !this.tabs.some(tab => tab.active)) {
      this.tabs[0].active = true;
    }
    
    // Subscribe to changes in the tabs
    this.tabComponents.changes.subscribe(() => {
      this.tabs = this.tabComponents.toArray();
      
      // If there are no active tabs but we have tabs, activate the first one
      if (this.tabs.length && !this.tabs.some(tab => tab.active)) {
        this.tabs[0].active = true;
      }
      
      this.checkOverflow();
    });
    
    // Check for overflow after rendering
    setTimeout(() => this.checkOverflow(), 0);
    
    // Add resize observer to check for overflow when window size changes
    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(() => this.checkOverflow());
      observer.observe(this.elementRef.nativeElement);
    } else {
      window.addEventListener('resize', () => this.checkOverflow());
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (event: MouseEvent) => {
      const dropdownEl = this.elementRef.nativeElement.querySelector('.pk-tabs-dropdown');
      if (this.showDropdown && dropdownEl && !dropdownEl.contains(event.target)) {
        this.showDropdown = false;
      }
    });
  }
  
  // Component lifecycle hook to handle positioning the dropdown menu
  ngAfterViewChecked() {
    if (this.showDropdown) {
      this.positionDropdownMenu();
    }
  }
  
  // Position the dropdown menu within the window boundaries
  private positionDropdownMenu() {
    const dropdownMenu = this.elementRef.nativeElement.querySelector('.pk-tabs-dropdown-menu.show');
    if (!dropdownMenu) return;
    
    const rect = dropdownMenu.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    // Check for vertical overflow
    if (rect.bottom > viewportHeight) {
      dropdownMenu.style.top = 'auto';
      dropdownMenu.style.bottom = '100%';
      dropdownMenu.style.marginTop = '0';
      dropdownMenu.style.marginBottom = '5px';
    } else {
      dropdownMenu.style.top = '100%';
      dropdownMenu.style.bottom = 'auto';
      dropdownMenu.style.marginTop = '5px';
      dropdownMenu.style.marginBottom = '0';
    }
    
    // Check for horizontal overflow
    if (rect.right > viewportWidth) {
      const overflow = rect.right - viewportWidth;
      dropdownMenu.style.right = `${overflow + 5}px`;
    } else {
      dropdownMenu.style.right = '0';
    }
  }
  
  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
    
    // If we're showing the dropdown, position it properly
    if (this.showDropdown) {
      setTimeout(() => this.positionDropdownMenu(), 0);
    }
  }
  
  selectTab(index: number) {
    // Deactivate all tabs
    this.tabs.forEach(tab => tab.active = false);
    
    // Activate the selected tab
    if (this.tabs[index]) {
      this.tabs[index].active = true;
      this.tabChange.emit(index);
    }
  }
  
  closeTab(index: number, event: Event) {
    event.stopPropagation();
    this.tabClose.emit(index);
    
    // If we're closing the active tab, activate another one
    if (this.tabs[index]?.active && this.tabs.length > 1) {
      // Try to activate the next tab, or the previous if we're closing the last tab
      const newIndex = index === this.tabs.length - 1 ? index - 1 : index;
      setTimeout(() => this.selectTab(newIndex), 0);
    }
  }
  
  checkOverflow() {
    if (this.overflow === 'dropdown') {
      const navElement = this.elementRef.nativeElement.querySelector('.pk-tabs-scroller');
      if (navElement) {
        const tabElements = Array.from(navElement.querySelectorAll('.pk-tab-item')) as HTMLElement[];
        const totalTabsWidth = tabElements.reduce((total, el) => total + el.offsetWidth, 0);
        
        this.isOverflowing = totalTabsWidth > navElement.offsetWidth;
      }
    }
  }
  
  getTabTitle(tab: PkTabComponent): string {
    // Try to extract title from the component
    const element = this.elementRef.nativeElement.querySelector(
      `.pk-tab-item[aria-selected="${tab.active ? 'true' : 'false'}"]`
    );
    return element?.textContent?.trim() || 'Tab';
  }
}
