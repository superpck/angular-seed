import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserFormComponent
  ],
  providers: []
})
export class UserFormWebComponentModule {
  constructor(private injector: Injector) {
    // Register the UserFormComponent as a custom element
    const userFormElement = createCustomElement(UserFormComponent, { injector });
    
    // Define the custom element if it's not already defined
    if (!customElements.get('app-user-form')) {
      customElements.define('app-user-form', userFormElement);
    }
  }
}
