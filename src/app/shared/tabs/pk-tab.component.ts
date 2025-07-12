import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PkTabTitleComponent } from './pk-tab-title.component';
import { PkTabBodyComponent } from './pk-tab-body.component';
import { PkTabFooterComponent } from './pk-tab-footer.component';

export type TabTheme = 'none' | 'primary' | 'warn' | 'success' | 'error';

@Component({
  selector: 'app-pk-tab',
  standalone: true,
  imports: [
    CommonModule,
    PkTabTitleComponent,
    PkTabBodyComponent,
    PkTabFooterComponent
  ],
  template: `
    <ng-container *ngIf="!hidden">
      <ng-container *ngTemplateOutlet="titleTemplateRef || defaultTitleTemplate"></ng-container>
      <ng-container *ngIf="active">
        <ng-container *ngTemplateOutlet="bodyTemplateRef || defaultBodyTemplate"></ng-container>
        <ng-container *ngTemplateOutlet="footerTemplateRef || defaultFooterTemplate"></ng-container>
      </ng-container>
    </ng-container>

    <ng-template #defaultTitleTemplate>
      <ng-content select="app-pk-tab-title"></ng-content>
    </ng-template>

    <ng-template #defaultBodyTemplate>
      <ng-content select="app-pk-tab-body"></ng-content>
    </ng-template>

    <ng-template #defaultFooterTemplate>
      <ng-content select="app-pk-tab-footer"></ng-content>
    </ng-template>
    
    <!-- These templates are just to satisfy the Angular compiler warnings -->
    <ng-template #hiddenTemplate style="display: none">
      <app-pk-tab-title *ngIf="false"></app-pk-tab-title>
      <app-pk-tab-body *ngIf="false"></app-pk-tab-body>
      <app-pk-tab-footer *ngIf="false"></app-pk-tab-footer>
    </ng-template>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class PkTabComponent {
  @Input() active = false;
  @Input() disabled = false;
  @Input() isClose = false;
  @Input() hidden = false;
  @Input() theme: TabTheme = 'none';

  @ContentChild(PkTabTitleComponent, { read: TemplateRef }) titleTemplateRef?: TemplateRef<unknown>;
  @ContentChild(PkTabBodyComponent, { read: TemplateRef }) bodyTemplateRef?: TemplateRef<unknown>;
  @ContentChild(PkTabFooterComponent, { read: TemplateRef }) footerTemplateRef?: TemplateRef<unknown>;
}
