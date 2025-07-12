import { 
  Component, 
  ContentChildren, 
  QueryList, 
  AfterContentInit, 
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
                      aria-label="Close tab">×</button>
            </button>
          </ng-container>
          
          <button *ngIf="showAddButton" 
                 class="pk-tab-add" 
                 (click)="addTab.emit()"
                 (keydown.enter)="addTab.emit()"
                 aria-label="Add new tab">+</button>
          
          <div *ngIf="overflow === 'dropdown' && isOverflowing" class="pk-tabs-dropdown">
            <button class="pk-tabs-dropdown-toggle" 
                   aria-label="More tabs">⋮</button>
            <div class="pk-tabs-dropdown-menu" role="menu">
              <ng-container *ngFor="let tab of tabs; let i = index">
                <button 
                  class="pk-tab-dropdown-item"
                  [class.active]="tab.active" 
                  [class.disabled]="tab.disabled"
                  (click)="!tab.disabled && selectTab(i)"
                  (keydown.enter)="!tab.disabled && selectTab(i)"
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
    }
    
    .pk-tabs-header {
      display: flex;
      border-bottom: 1px solid #e0e0e0;
      position: relative;
    }
    
    .pk-tabs-nav {
      display: flex;
      position: relative;
      flex: 1;
    }
    
    .pk-tabs-nav.wrap {
      flex-wrap: wrap;
    }
    
    .pk-tab-item {
      padding: 0.75rem 1rem;
      cursor: pointer;
      user-select: none;
      display: flex;
      align-items: center;
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
      white-space: nowrap;
      background: transparent;
      border: none;
      font-family: inherit;
      font-size: inherit;
    }
    
    .pk-tab-item:focus {
      outline: 2px solid #3f51b5;
      outline-offset: -2px;
    }
    
    .pk-tab-item.active {
      border-bottom-color: #3f51b5;
      font-weight: 500;
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
      cursor: pointer;
      line-height: 1;
      padding: 0 4px;
      border-radius: 50%;
    }
    
    .pk-tab-close:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    
    .pk-tab-add {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      padding: 0.5rem;
      margin-left: 4px;
    }
    
    .pk-tabs-content {
      padding: 1rem 0;
    }
    
    /* Theme variations */
    .theme-primary.active {
      border-bottom-color: #3f51b5;
      color: #3f51b5;
    }
    
    .theme-warn.active {
      border-bottom-color: #ff9800;
      color: #ff9800;
    }
    
    .theme-success.active {
      border-bottom-color: #4caf50;
      color: #4caf50;
    }
    
    .theme-error.active {
      border-bottom-color: #f44336;
      color: #f44336;
    }
    
    /* Overflow handling */
    .overflow-scroll .pk-tabs-nav {
      overflow-x: auto;
      scrollbar-width: thin;
    }
    
    .overflow-dropdown .pk-tabs-nav {
      overflow: hidden;
    }
    
    .pk-tabs-dropdown {
      position: relative;
      display: inline-block;
    }
    
    .pk-tabs-dropdown-toggle {
      background: none;
      border: none;
      font-size: 18px;
      padding: 0.75rem 0.5rem;
      cursor: pointer;
    }
    
    .pk-tabs-dropdown-menu {
      display: none;
      position: absolute;
      right: 0;
      top: 100%;
      background-color: white;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      z-index: 10;
      min-width: 150px;
    }
    
    .pk-tabs-dropdown:hover .pk-tabs-dropdown-menu,
    .pk-tabs-dropdown:focus-within .pk-tabs-dropdown-menu {
      display: block;
    }
    
    .pk-tab-dropdown-item {
      padding: 0.5rem 1rem;
      cursor: pointer;
      background: none;
      border: none;
      text-align: left;
      width: 100%;
      font-family: inherit;
      font-size: inherit;
    }
    
    .pk-tab-dropdown-item:hover {
      background-color: #f5f5f5;
    }
    
    .pk-tab-dropdown-item.active {
      font-weight: 500;
      background-color: #e8eaf6;
    }
    
    .pk-tab-dropdown-item.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class PkTabsComponent implements AfterContentInit {
  @ContentChildren(PkTabComponent) tabComponents!: QueryList<PkTabComponent>;
  
  @Input() overflow: TabOverflowType = 'scroll';
  @Input() showAddButton = false;
  
  @Output() tabChange = new EventEmitter<number>();
  @Output() tabClose = new EventEmitter<number>();
  @Output() addTab = new EventEmitter<void>();
  
  tabs: PkTabComponent[] = [];
  isOverflowing = false;
  
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
      const navElement = this.elementRef.nativeElement.querySelector('.pk-tabs-nav');
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
