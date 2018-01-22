import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service/auth-service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  templateUrl: 'app.html'
})
export class MyApp  {
  rootPage: string = 'LoginPage';
  authUser$: Subscription;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private auth: AuthService) {
    // if user is already authenticated don't log in again
    console.log('In constructor');
    this.authUser$ = this.auth.getAutenticatedUser().subscribe(auth => {
      !auth ? this.rootPage = 'LoginPage' : this.rootPage = 'HomePage';
   });
   this.authUser$.unsubscribe();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
 

}

