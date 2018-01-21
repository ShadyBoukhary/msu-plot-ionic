import { Component, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Profile } from '../../models/profile/profile.interface';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'firebase/app';

import { AuthService } from '../../providers/auth-service/auth-service';
import { DataService } from '../../providers/database-service/database-service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: 'edit-profile-form.html'
})
export class EditProfileFormComponent implements OnDestroy, OnInit {

  private authenticatedUser$: Subscription; // observable
  private authenticatedUser: User;


  
  @Output() saveProfileResult: EventEmitter<Boolean>;
  @Input() profile: Profile;

  constructor(private auth: AuthService, private data: DataService) {

    this.saveProfileResult = new EventEmitter<Boolean>();
    // get the authenticated user as an observable, subscribe to it, which returns an Observable
    // of type User, assign to authenticatedUser to be passed to saveProfile()
    this.authenticatedUser$ = this.auth.getAutenticatedUser().subscribe((user: User) => {
      this.authenticatedUser = user;
    })
  }


  async saveProfile() {
    // result of trying to save profile
    // returned as a promise<boolean>
    if (this.authenticatedUser) {
      this.profile.email = this.authenticatedUser.email;
      const result = await this.data.saveProfile(this.authenticatedUser, this.profile);
      this.saveProfileResult.emit(result);
    }
  }

  ngOnDestroy(): void {
    this.authenticatedUser$.unsubscribe();
  }

  // if profile does not exist initialize it as an empty on
  // if it does exist then it has been passed to the component as a parameter
  ngOnInit(): void {
    if (!this.profile){
      this.profile = {} as Profile;
    }
  }
}
