import { Injectable } from '@angular/core';
//import { AngularFireDatabase/*, AngularFireObject*/} from 'angularfire2/database';
import { FirebaseObjectObservable, AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
import { User, database } from 'firebase/app';
import { Profile } from '../../models/profile/profile.interface';
import { AuthService } from '../auth-service/auth-service';


import 'rxjs/add/operator/take';
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";



@Injectable()
export class DataService {

  /*profileObject: AngularFireObject<Profile>*/
  profileObject: FirebaseObjectObservable<Profile>;
  profileList: FirebaseListObservable<Profile>;

  
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
    this.profileObject = this.database.object(`/profiles/${user.uid}`, { preserveSnapshot: true});
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
    catch(e) {
      console.log(e);
      return false;
    }
  }

}
