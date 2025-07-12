import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PkTabsComponent } from '../shared/tabs/pk-tabs.component';
import { PkTabComponent } from '../shared/tabs/pk-tab.component';
import { PkTabTitleComponent } from '../shared/tabs/pk-tab-title.component';
import { PkTabBodyComponent } from '../shared/tabs/pk-tab-body.component';
import { PkTabFooterComponent } from '../shared/tabs/pk-tab-footer.component';
import { TabTheme } from '../shared/tabs/pk-tab.component';

interface TabItem {
  title: string;
  theme: TabTheme;
  active: boolean;
  disabled?: boolean;
  isClose?: boolean;
}

@Component({
  selector: 'app-tabs-demo',
  standalone: true,
  imports: [
    CommonModule,
    PkTabsComponent,
    PkTabComponent,
    PkTabTitleComponent,
    PkTabBodyComponent,
    PkTabFooterComponent
  ],
  template: `
    <div class="container">
      <h1>Tabs Demo</h1>
      
      <div class="section">
        <h2>Basic Tabs</h2>
        <app-pk-tabs (tabChange)="setActive($event)">
          <app-pk-tab *ngFor="let tab of tabs; let i = index"
                    [active]="tab.active"
                    [disabled]="tab.disabled || false"
                    [isClose]="tab.isClose || false"
                    [theme]="tab.theme">
            <app-pk-tab-title>{{ tab.title }}</app-pk-tab-title>
            <app-pk-tab-body>
              <p>Content for {{ tab.title }}</p>
              <p>This tab has the {{ tab.theme }} theme.</p>
              <button class="btn" (click)="addTab()">Add another tab</button>
            </app-pk-tab-body>
            <app-pk-tab-footer>
              Footer for {{ tab.title }}
            </app-pk-tab-footer>
          </app-pk-tab>
        </app-pk-tabs>
      </div>
      
      <div class="section">
        <h2>Tabs with Overflow Scroll</h2>
        <app-pk-tabs overflow="scroll" 
                   [showAddButton]="true" 
                   (addTab)="addTab()" 
                   (tabClose)="closeTab($event)">
          <app-pk-tab *ngFor="let tab of manyTabs; let i = index"
                    [active]="tab.active"
                    [isClose]="true"
                    [theme]="tab.theme">
            <app-pk-tab-title>{{ tab.title }}</app-pk-tab-title>
            <app-pk-tab-body>
              <p>Content for {{ tab.title }}</p>
            </app-pk-tab-body>
          </app-pk-tab>
        </app-pk-tabs>
      </div>
      
      <div class="section">
        <h2>Tabs with Dropdown Overflow</h2>
        <app-pk-tabs overflow="dropdown">
          <app-pk-tab *ngFor="let tab of manyTabs; let i = index"
                    [active]="i === 0"
                    [theme]="tab.theme">
            <app-pk-tab-title>{{ tab.title }}</app-pk-tab-title>
            <app-pk-tab-body>
              <p>Content for {{ tab.title }}</p>
            </app-pk-tab-body>
          </app-pk-tab>
        </app-pk-tabs>
      </div>
      
      <div class="section">
        <h2>Tabs with New Line Overflow</h2>
        <app-pk-tabs overflow="new-line">
          <app-pk-tab *ngFor="let tab of manyTabs; let i = index"
                    [active]="i === 0"
                    [theme]="tab.theme">
            <app-pk-tab-title>{{ tab.title }}</app-pk-tab-title>
            <app-pk-tab-body>
              <p>Content for {{ tab.title }}</p>
            </app-pk-tab-body>
          </app-pk-tab>
        </app-pk-tabs>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .section {
      margin-bottom: 2rem;
      padding: 1rem;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
    }
    
    h1 {
      margin-bottom: 2rem;
    }
    
    h2 {
      margin-bottom: 1rem;
    }
    
    .btn {
      background-color: #3f51b5;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 0.5rem 1rem;
      cursor: pointer;
    }
    
    .btn:hover {
      background-color: #303f9f;
    }
  `]
})
export class TabsDemoComponent {
  tabs: TabItem[] = [
    { title: 'Tab 1', theme: 'primary', active: true },
    { title: 'Tab 2', theme: 'success', active: false },
    { title: 'Tab 3', theme: 'warn', active: false, disabled: true },
    { title: 'Tab 4', theme: 'error', active: false, isClose: true }
  ];
  
  manyTabs: TabItem[] = Array.from({ length: 10 }, (_, i) => {
    const themes: TabTheme[] = ['primary', 'success', 'warn', 'error', 'none'];
    return {
      title: `Tab ${i + 1}`,
      theme: themes[i % themes.length],
      active: i === 0
    };
  });
  
  addTab() {
    const newTab: TabItem = { 
      title: `Tab ${this.tabs.length + 1}`, 
      theme: 'none', 
      active: false 
    };
    
    this.tabs.push(newTab);
    
    this.manyTabs.push({ 
      title: `Tab ${this.manyTabs.length + 1}`, 
      theme: 'none', 
      active: false 
    });
  }
  
  setActive(idx: number) {
    this.tabs.forEach((tab, i) => tab.active = i === idx);
  }
  
  closeTab(idx: number) {
    this.manyTabs.splice(idx, 1);
  }
}
