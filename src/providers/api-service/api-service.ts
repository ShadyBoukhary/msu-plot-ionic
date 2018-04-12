import { Injectable } from '@angular/core';
import { Events, ToastController } from 'ionic-angular';
import { Alert } from '../../models/alert/alert.interface';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { LocalNotifications } from '@ionic-native/local-notifications';
import 'rxjs/add/observable/interval';
import { DataService } from '../database-service/database-service';
import { User } from 'firebase/app';


@Injectable()
export class ApiServiceProvider {

  alert: Alert;
  constructor(private events: Events, private toast: ToastController, private notf: LocalNotifications, private data: DataService) {

  }

  initialize() {
    this.events.subscribe(('alert-created'), (alert: Alert, user: User) => {
      console.log('before');
      this.alert = alert;
      this.alertHandler(user);
    });
    this.events.subscribe(('alert-edited'), (alert: Alert, user: User) => {
      let prev = this.alert.state;
      this.alert = alert;
      // if alert was off then turned on again, proceed as if a new alert was created
      if (this.alert.state == true && prev == false) {
        this.events.publish('alert-created', alert, user);
      }
      console.log('edited');
      console.log(this.alert);
    });
    this.events.subscribe(('alert-deleted'), () => {
      this.alert.state = false;
      console.log('deleted');
    });
  }

  checkTime(alert: Alert) {

    let hours = new Date().getHours();
    let timeOfDay = 'am';
    let minutes = new Date().getMinutes().toPrecision(2);
    let day = new Date().getDay();

    if (hours == 0) {
      hours = 12;
    } else if (hours == 12) {
      timeOfDay = 'pm';
    } else if (hours > 12) {
      timeOfDay = 'pm';
      hours -= 12;
    }

    let time = `${day.toString()}.${hours.toString()}:${minutes}${timeOfDay}`;
    let alertTime = `${this.convertDay(alert.day)}.${alert.time.hour}:${alert.time.minute}${alert.time.timeOfDay}`;
    console.log(time);
    console.log(alertTime);

    // check if alert time == current time
    if (time == alertTime) {
      return true;
    } else if (this.convertDay(alert.day).includes(day.toString())
      && alert.time.hour == hours.toString()
      && alert.time.minute == minutes
      && alert.time.timeOfDay == timeOfDay) {
      return true
    } else {
      return false;
    }
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

  alertHandler(user: User) {
    console.log('before 2');

    let sub = Observable.interval(1000).subscribe(() => {
      // check if alert is on
      if (this.alert.state) {
        // check if time for alert
        if (this.checkTime(this.alert)) {
          console.log('true');
          // api call here

          // send notifcation here
          this.sendNotification(this.alert, 'Works').then(() => {
            sub.unsubscribe();
            // if alert is not repeating, turn it off
            if (!this.alert.repeat) {
              this.alert.state = false;
            }

            console.log(alert);
            this.data.updateAlert(user, this.alert).then(result => {
              if (!result) {
                console.log('Error Ocurred');
              }
            }).catch(e => console.log(e));
          }).catch(e => console.log(e));
        }
      }
      // if alert is off, stop checking
      else {
        sub.unsubscribe();
      }
    });
  }
  convertDay(days: string[]): string {
    let daysNum: string = '';
    days.forEach(day => {
      if (day == 'Mon') {
        daysNum += '0';
      }
      else if (day == 'Tue') {
        daysNum += '1';
      }
      else if (day == 'Wed') {
        daysNum += '2';
      }
      else if (day == 'Thu') {
        daysNum += '3';
      }
      else if (day == 'Fri') {
        daysNum += '4';
      }
      else if (day == 'Sat') {
        daysNum += '5';
      }
      else {
        daysNum += '6';
      }
    })
    return daysNum;
  }
}
