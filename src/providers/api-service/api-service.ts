import { Injectable } from '@angular/core';
import { Events, ToastController } from 'ionic-angular';
import { Alert } from '../../models/alert/alert.interface';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { LocalNotifications } from '@ionic-native/local-notifications';
import 'rxjs/add/observable/interval';


/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiServiceProvider {


  constructor(private events: Events, private toast: ToastController, private notf: LocalNotifications) {
    
  }
  
  initialize() {
    this.events.subscribe(('alert-created'), (alert: Alert) => {
      // this.toast.create({
      //   message: 'Alert Created',
      //   duration: 2000
      // });
      console.log('before');
      this.alertHandler(alert);
    });
  }

  checkTime(alert: Alert) {
    let now: number =  Date.now();
    let year: number = new Date().getFullYear();
    // to be implemented
    let time = `${year.toString()}.${new Date().getMonth().toString()}`;
    console.log(now);
    return true;
  }

  // async
  getLotInfo() {

  }

  async sendNotification(alert: Alert, data: String) {
    if (!this.notf.hasPermission()) {
      await this.notf.registerPermission();
    }
    this.notf.schedule({
      title: `Space Availabilty in ${alert.lot}`,
      text: `There are currently ${data} space(s) available in ${alert.lot}`
    });
  }

  alertHandler(alert: Alert) {
    console.log('before 2');
    let sub = Observable.interval(1000).subscribe(() => {
      console.log('here');
      if (this.checkTime(alert)) {
        // api call here

        // send notifcation here
        this.sendNotification(alert, 'Works').then(() =>{
          sub.unsubscribe();
        }).catch(e => console.log(e));
      }
    });
  }
}
