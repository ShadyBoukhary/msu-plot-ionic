import { Component } from '@angular/core';

/**
 * Generated class for the ProfileViewComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-profile-view',
  templateUrl: 'profile-view.html'
})
export class ProfileViewComponent {

  text: string;

  constructor() {
    console.log('Hello ProfileViewComponent Component');
    this.text = 'Hello World';
  }

}
