import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Alert } from '../../models/alert/alert.interface';

/**
 * Generated class for the AlertsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alerts',
  templateUrl: 'alerts.html',
})
export class AlertsPage {

  alertOn: boolean;
  alerts: Alert[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.alerts[0] = {
      time: {
        hour: '5',
        minute: '44',
        timeOfDay: 'am'
      },
      day: [
        false, true, true, true, false, false, false
      ]
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlertsPage');
  }

}
