import { Component } from '@angular/core';

@Component({
  selector: 'app-pk-tab-body',
  standalone: true,
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: block;
      padding: 1rem;
    }
  `]
})
export class PkTabBodyComponent {}