import { Injectable, OnDestroy } from '@angular/core';
//import { AngularFireDatabase/*, AngularFireObject*/} from 'angularfire2/database';
import { FirebaseObjectObservable, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { User, database } from 'firebase/app';
import { Profile } from '../../models/profile/profile.interface';
import { AuthService } from '../auth-service/auth-service';


import 'rxjs/add/operator/take';
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import 'rxjs/add/operator/first';


import { Alert } from '../../models/alert/alert.interface';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { first } from 'rxjs/operator/first';



@Injectable()
export class DataService implements OnDestroy {

  /*profileObject: AngularFireObject<Profile>*/
  profileObject: FirebaseObjectObservable<Profile>;
  profileList: FirebaseListObservable<Profile>;
  alertObject: FirebaseObjectObservable<Alert>;
  alertList: FirebaseListObservable<Alert[]>;
  sub: Subscription;


  constructor(private auth: AuthService, private database: AngularFireDatabase) {
  }


  // returns an authenticated user profile by merging 2 observables
  getAuthenticatedUserProfile() {
    return this.auth.getAutenticatedUser()
      .map(user => user.uid)  // get authenticated user ID
      // merge the previous observable with the profile observable of the
      // user with that ID
      .mergeMap(authId => this.database.object(`profiles/${authId}`))
      // complete the observable cycle
      .take(1);
  }


  getProfile(user: User) {
    /* preservesnapshot prevents database from unwrapping data */
    this.profileObject = this.database.object(`/profiles/${user.uid}`, { preserveSnapshot: true });
    console.log('Returning Profile');
    return this.profileObject.take(1);
  }

  /* authenticated user and current profile */
  async saveProfile(user: User, profile: Profile) {
    // get the user profile as an observable /profiles/ etc.. is the structure inside FireBase
    this.profileObject = this.database.object(`/profiles/${user.uid}`);
    try {
      /*  try to set the profileObject in the database
       returns a promise ==> need async/await */
      await this.profileObject.set(profile);
      return true;
    }
    catch (e) {
      console.log(e);
      return false;
    }
  }

  /* Authenticated user and alert to be saved */
  async saveAlert(user: User, alert: Alert): Promise<boolean> {
    try {
      /* Try to save the alert in the database*/
      await this.database.list(`/alerts/${user.uid}`).push(alert);
      return true;
    }
    catch (e) {
      console.log(e);
      return false;
    }
  }
  async getFirstAlert(user: User)  {
    try {
      // this.sub = await this.getAlerts(user).subscribe((alerts: Alert[]) => {
      //   let first =  alerts[alerts.length - 1];
      //   console.log(first);
      //   return first.$key;

      // })
      return await this.getAlerts(user).map((alerts: Alert[]) => alerts[alerts.length - 1]);
    } catch (error) {
      console.log(error);
      //return ' hi';
    }
  }

  // get the list of the results for a user
  getAlerts(user: User): FirebaseListObservable<Alert[]> {
    return this.database.list(`/alerts/${user.uid}`);
  }

  // update an existing alert
  async updateAlert(user: User, alert: Alert): Promise<boolean> {
    // get reference to alert object
    this.alertObject = this.database.object(`/alerts/${user.uid}/${alert.$key}`);

    try {
      // update the alert
      await this.alertObject.set(alert);
      return true;
      // catch any errors
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  // delete an alert from the database
  async deleteAlert(user: User, alert: Alert): Promise<boolean> {
    // get a reference to the alert object in the database
    this.alertObject = this.database.object(`/alerts/${user.uid}/${alert.$key}`);

    // delete object and catch errors
    try {
      await this.alertObject.remove();
      return true;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  
}


