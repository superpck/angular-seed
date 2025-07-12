import { Component } from '@angular/core';

@Component({
  selector: 'app-pk-tab-footer',
  standalone: true,
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: block;
      padding: 0.5rem 1rem;
      border-top: 1px solid #e0e0e0;
    }
  `]
})
export class PkTabFooterComponent {}
