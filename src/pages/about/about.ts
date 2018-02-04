import { Component } from '@angular/core';
import { IonicPage, Platform } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage implements OnInit {
  info : {
    name: string;
    package: any;
    version: any;
    versionCode: any;
  }

 

  constructor(private app: AppVersion, private platform: Platform) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  async getAppInfo() {
    // this.info.name = await this.app.getAppName();
    // console.log(this.info.name);
    // this.info.package = await this.app.getPackageName();
    // console.log(this.info.package);
    // this.info.version = await this.app.getVersionNumber();
    // console.log(this.info.version);
    // this.info.versionCode = await this.app.getVersionCode();
    // console.log(this.info.versionCode);
    this.info = {
      name: await this.app.getAppName(),
      package: await this.app.getPackageName(),
      version: await this.app.getVersionNumber(),
      versionCode: await this.app.getVersionCode()
    };
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.getAppInfo().then();
     });
  }
}
