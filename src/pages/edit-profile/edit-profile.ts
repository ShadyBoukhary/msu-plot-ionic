import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../models/profile/profile.interface';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  profile = {} as Profile;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.profile = this.navParams.get('existingProfile');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  saveProfileResult(event: Boolean) {
   event ? this.navCtrl.setRoot('TabsPage') : console.log('Not authenticated or saved.');
  }

}
