import { Component, EventEmitter, Output } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Account } from '../../models/account/account.interface';
import { LoginResponse } from '../../models/login/login-response.interface';
import { AuthService } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'app-login-form',
  templateUrl: 'login-form.html'
})
export class LoginFormComponent {


  account = {} as Account;
  @Output() loginStatus: EventEmitter<LoginResponse>;

  constructor(private auth: AuthService, private navCtrl: NavController) {
    this.loginStatus = new EventEmitter<LoginResponse>();
  }
  
  async login() {
    
     const response: LoginResponse = await this.auth.signInWithEmailAndPassword(this.account);
    this.loginStatus.emit(response);
  
  }

  



  register() : void {
    this.navCtrl.push('RegisterPage');
  }
}

