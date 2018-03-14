import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service/auth-service';
import { Subscription } from 'rxjs/Subscription';
import { ApiServiceProvider } from '../providers/api-service/api-service';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: string;
  authUser$: Subscription;
  x: number;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private auth: AuthService,
  private api: ApiServiceProvider) {
    // if user is already authenticated don't log in again
    this.x = 0;
    console.log('In constructor');
    this.authUser$ = this.auth.getAutenticatedUser().subscribe(auth => {
      //this.x++;
      console.log('In subscription');
      // ***************** VERY IMPORTANT ****************
      // if this is the first time in subscription (at launch of app, check for auth)
      // When signing out of app, the progran returns to the subscription here,
      // so, unsubscribe from the observable to prevent errors.
      // This is probably not the best way to fix the error. This is merely a 
      // workaround for an issue caused by not unsubscribing.
      //  The issue was that since we are still subscribed, the program would
      // abruptly return to the block of code and authenticate users that 
      // should not be authenticated. Granted, it still returns to this block
      // but only to unsubscribe this time
      // I couldn't 
      // unsubscribe any other way since i am inside app.component.ts
      // and any code in the constructor outside this block would run before this
      // code since subscribing is slow. Also, I can't use async/await inside the constructor
      // The issue has been resolved with the following if statements containing
      // the variable x

      if (this.x === 0) {

        if (!auth) {
          this.rootPage = 'LoginPage';
          console.log('Not Authenticated');
        }
        else {
          this.rootPage = 'TabsPage';
          console.log('Authenticated');
        }
        this.x++;
        console.log(this.x);
      }

      else{
        console.log('Unsubbing');
        this.authUser$.unsubscribe();
      }
    })
    console.log(this.x);

   
  

    

    platform.ready().then(() => {
      this.api.initialize();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }


}

