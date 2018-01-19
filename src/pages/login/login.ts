import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { LoginResponse } from '../../models/login/login-response.interface';
import { DataService } from '../../providers/database-service/database-service';
import { User } from 'firebase/app';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(private data: DataService, private toast: ToastController ,private navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(event: LoginResponse) {
    console.log(event);
    if (!event.error) {
      this.toast.create({
        message: `Welcome to PLot, ${event.result.email}`,
        duration: 3000
      }).present();

      // cast LoginResponse to User
      this.data.getProfile(<User>event.result).subscribe(profile => {
        console.log(profile);
        profile.val() ? this.navCtrl.setRoot('TabsPage') : this.navCtrl.setRoot('EditProfilePage');
      })
    }
    else {
      this.toast.create({
        message: event.error.message,
        duration: 3000
      }).present();
    }
    

  }


}
