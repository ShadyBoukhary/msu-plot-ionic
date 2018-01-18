import { Component, Output, EventEmitter } from '@angular/core';
import { Account } from '../../models/account/account.interface';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LoginResponse } from '../../models/login/login-response.interface';

/**
 * Generated class for the RegisterFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-register-form',
  templateUrl: 'register-form.html'
})
export class RegisterFormComponent {

  account = {} as Account;


  @Output() registerStatus: EventEmitter<LoginResponse>;
  constructor(private auth: AuthService) {
    this.registerStatus = new EventEmitter<LoginResponse>();
  }

  // register a FireBase account with email and password provided, handle any errors
  // show a toast indicating whether the account was registered successfully
  async register() {
    try
    {
      const result = await this.auth.createUserWithEmailAndPassword(this.account);
      this.registerStatus.emit(result);
    }
    catch(e)
    {
      console.error(e);
      this.registerStatus.emit(e);
    }
  }
}

