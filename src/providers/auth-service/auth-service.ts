import { Injectable } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import { Account } from '../../models/account/account.interface';
import { LoginResponse } from '../../models/login/login-response.interface';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthService {

  constructor(private auth: AngularFireAuth, private data: AngularFireDatabase) {
    console.log('Hello AuthProvider Provider');
  }


  /* Sign the user in using email and password. Catch any errors
    Function is async due to returned promises that need to be resolved*/
  async signInWithEmailAndPassword(account: Account) {

    try {
      return <LoginResponse> {
        result: await this.auth.auth.signInWithEmailAndPassword(account.email, account.password)
      };
    }
    catch(e){
      return <LoginResponse> {
        error: e
      };
    }
    
  }

  async createUserWithEmailAndPassword(account: Account) {
    try {
      return <LoginResponse> {
        result: await  this.auth.auth.createUserWithEmailAndPassword(account.email, account.password)
      };
    }
    catch(e){
      return <LoginResponse> {
        error: e
      };

    }
  }

  getAutenticatedUser() {
    //this.data.database.goOnline();
    console.log(this.auth.authState);

    return this.auth.authState;
  }

  signOut() { 
    this.auth.auth.signOut();
  }
}
