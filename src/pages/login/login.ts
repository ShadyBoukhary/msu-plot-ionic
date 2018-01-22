import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { LoginResponse } from '../../models/login/login-response.interface';
import { DataService } from '../../providers/database-service/database-service';
import { User } from 'firebase/app';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';
import { Profile } from '../../models/profile/profile.interface';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnDestroy {

  $authProfile: Subscription;
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
      console.log(event.result);
      try {
      this.$authProfile = this.data.getProfile(<User>event.result).subscribe(profile => {
         console.log(profile);
         console.log('About to try to navigate');
      //  // profile.val() ? this.navCtrl.setRoot('TabsPage') : this.navCtrl.setRoot('EditProfilePage');
         if (profile.val()) {
           console.log('About to Go to Home Page');
           this.navCtrl.setRoot('HomePage');
         }
         else {
           console.log('About to Edit Profile');
           this.navCtrl.setRoot('EditProfilePage');
         }
       })

      
    }
    catch(e) {
      console.error(e);
    }
    
    }
    else {
      this.toast.create({
        message: event.error.message,
        duration: 3000
      }).present();
    }
    
    

  }

  ngOnDestroy() {
    this.$authProfile.unsubscribe();
    console.log('Destroyed');
  }
}
