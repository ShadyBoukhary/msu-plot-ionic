import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  info : {
    name: any;
    package: any;
    version: any;
    versionCode: any;
  }
 

  constructor(private app: AppVersion) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }
  async ionViewWillLoad() {
    await this.getAppInfo();
  }
  async getAppInfo() {
    this.info.name = await this.app.getAppName();
    console.log(this.info.name);
    this.info.package = await this.app.getPackageName();
    console.log(this.info.package);
    this.info.version = await this.app.getVersionNumber();
    console.log(this.info.version);
    this.info.versionCode = await this.app.getVersionCode();
    console.log(this.info.versionCode);
  }
}
