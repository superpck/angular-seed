import { Component } from '@angular/core';

@Component({
  selector: 'app-pk-tab-title',
  standalone: true,
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class PkTabTitleComponent {}
