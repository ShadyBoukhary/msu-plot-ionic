import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../providers/database-service/database-service';
import { User } from 'firebase/app';
import { Profile } from '../../models/profile/profile.interface';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Loading } from 'ionic-angular/components/loading/loading';

@Component({
  selector: 'app-profile-view',
  templateUrl: 'profile-view.html'
})
export class ProfileViewComponent implements OnInit {

  userProfile: Profile;
  authUser: User;
  loader: Loading;

  @Output() existingProfile: EventEmitter<Profile>;

  constructor(private data: DataService, private loading: LoadingController) {
    this.existingProfile = new EventEmitter<Profile>();
    this.loader = this.loading.create({
      content: 'Loading profile...'
    });
  }

  // get the user profile upon loading the component
  // get authenticated user, then get his profile and assign it to a local object
  ngOnInit(): void {
    this.loader.present();

    this.data.getAuthenticatedUserProfile().subscribe(profile => {
      this.userProfile = profile;
      this.existingProfile.emit(this.userProfile);
      this.loader.dismiss();
    });
  }
  


}