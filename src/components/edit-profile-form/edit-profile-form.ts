import { Component } from '@angular/core';

/**
 * Generated class for the EditProfileFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-edit-profile-form',
  templateUrl: 'edit-profile-form.html'
})
export class EditProfileFormComponent {

  text: string;

  constructor() {
    console.log('Hello EditProfileFormComponent Component');
    this.text = 'Hello World';
  }

}
