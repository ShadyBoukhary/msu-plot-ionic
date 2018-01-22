import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { App } from 'ionic-angular';


/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {


  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, private app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  navigateToPage(page: string): void {
    this.navCtrl.push(page);
  }

  signOut() {
    this.auth.signOut();
    this.app.getRootNavs()[0].setRoot('LoginPage');
    // this.navCtrl.setRoot('LoginPage');
    console.log('Sign Out Successful');
  }
}
