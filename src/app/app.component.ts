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

