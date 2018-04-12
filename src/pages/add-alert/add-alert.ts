import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Alert } from '../../models/alert/alert.interface';
import { Globalization } from '@ionic-native/globalization';


/**
 * Generated class for the AddAlertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-alert',
  templateUrl: 'add-alert.html',
})
export class AddAlertPage {

  alert = {} as Alert;
  $key: string;
  title: string = 'New Alert';
  repeat: boolean = false;
  lot: string = "Bolin";
  date: string;
  dayInt: number;
  day: string;
  days: string[] = [
    "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
  ];
  dayIndex: number;
  selectedDays: string[];
  timezone: string;
  currentHour: string;
  hour: string;
  timeOfDay: string;
  minutes: string;
  constructor(public navParams: NavParams, private view: ViewController, private global: Globalization) {

    // get date based on timezone
    if (this.title != 'Edit Alert') {
      this.date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
      let time = this.date.split(":");
      let hours = time[0].split("T");
      let minutes = time[1];
      this.currentHour = hours[1];
      console.log(this.date);
      this.dayInt = new Date().getDay();
      console.log(this.dayInt);

      if (this.dayInt == 1) {
        this.day = "Mon";
        this.dayIndex = 0;
      }
      else if (this.dayInt == 2) {
        this.day = "Tue";
        this.dayIndex = 1;
      }
      else if (this.dayInt == 3) {
        this.day = "Wed";
        this.dayIndex = 2;
      }
      else if (this.dayInt == 4) {
        this.day = "Thu";
        this.dayIndex = 3;
      }
      else if (this.dayInt == 5) {
        this.day = "Fri";
        this.dayIndex = 4;
      }
      else if (this.dayInt == 6) {
        this.day = "Sat";
        this.dayIndex = 5;
      }
      else {
        this.day = "Sun";
        this.dayIndex = 6;
      }
      console.log("Day: ", this.day);
    }


  }

  ionViewWillLoad() {
    this.alert = this.navParams.get('data');
    console.log(this.alert);
    if (this.alert) {
      this.title = 'Edit Alert';
      this.lot = this.alert.lot;
      this.repeat = this.alert.repeat;
      this.selectedDays = this.alert.day;
      this.hour = this.alert.time.hour;
      this.minutes = this.alert.time.minute;
      this.timeOfDay = this.alert.time.timeOfDay;
      let hourInt = parseInt(this.hour);
      if (this.timeOfDay == "pm") {
        console.log(this.hour);
        hourInt = 7;
        if (this.hour == '12') {
          hourInt = 19;
        }
      }
      else {
        if (parseInt(this.hour) == 12) {
          this.hour = '0';
        }
        hourInt = -5;
      }
      console.log(parseInt(this.hour) + hourInt);
      this.date = new Date(2018, 4, parseInt(this.hour), parseInt(this.hour) + hourInt, parseInt(this.minutes)).toISOString();
      console.log(this.date);

    }
  }

  close() {
    this.view.dismiss();
  }

  save() {
    // get the hour and minutes
    let time = this.date.split(":");
    let hours = time[0].split("T");
    this.minutes = time[1];
    this.hour = hours[1];


    let hourInt = 0;

    let day = [];

    // if repeating set the correct repeating days
    if (this.repeat == true) {
      day = this.selectedDays;
    }
    // if not repeating
    else {
      // check whether alert should be on current day or next day
      if (parseInt(this.hour) > parseInt(this.currentHour)) {
        day = [this.day];
      }
      else {
        day = [this.days[this.dayIndex + 1]];
      }
    }

    // convert hour to 12-hour based and set am and pm\
    console.log(this.hour);
    if (parseInt(this.hour) >= 12) {
      this.timeOfDay = "pm";
      if (parseInt(this.hour) > 12) {
        hourInt = parseInt(this.hour) - 12;
        this.hour = hourInt.toString();
      }
    }
    else  {
      this.timeOfDay = "am";
      if (parseInt(this.hour) < 1) {
        hourInt = parseInt(this.hour) + 12;
        this.hour = hourInt.toString();
      }

    }

    // construct the alert
    if (this.title != 'Edit Alert') {
      let alert1: Alert = {
        time: {
          hour: this.hour,
          minute: this.minutes,
          timeOfDay: this.timeOfDay
        },
        day: day,
        state: true,
        lot: this.lot,
        repeat: this.repeat
      };
      console.log(alert1);
      this.view.dismiss(alert1);
    }
    else {
      this.alert.time.hour = this.hour;
      this.alert.time.minute = this.minutes;
      this.alert.time.timeOfDay = this.timeOfDay;
      this.alert.day = day;
      this.alert.state = true;
      this.alert.lot = this.lot;
      this.alert.repeat = this.repeat;
      console.log(this.alert);
      this.view.dismiss(this.alert);
    }

  }
}
