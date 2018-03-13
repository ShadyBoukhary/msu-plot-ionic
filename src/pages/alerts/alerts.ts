import { Component } from '@angular/core';
import { IonicPage, ModalController, Modal } from 'ionic-angular';
import { Alert } from '../../models/alert/alert.interface';
import { AuthService } from '../../providers/auth-service/auth-service';
import { DataService } from '../../providers/database-service/database-service';
import { User } from 'firebase/app';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the AlertsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alerts',
  templateUrl: 'alerts.html',
})
export class AlertsPage implements OnDestroy {

  private authenticatedUser: User;
  private authenticatedUser$: Subscription;

  alertOn: boolean;
  alert: Alert;
  alertList: Observable<Alert[]>;
  constructor(private toast: ToastController, private modal: ModalController, private auth: AuthService, private data: DataService) {

    this.authenticatedUser$ = this.auth.getAutenticatedUser().subscribe((user: User) => {
      this.authenticatedUser = user;
    })
  }

  ionViewWillLoad() {
    // get alert list
    this.alertList = this.data.getAlerts(this.authenticatedUser);
    console.log(this.alertList);
  }

   async addAlert() {
    console.log('Add alert');
    const modal: Modal = this.modal.create('AddAlertPage');
    modal.present();
    // get the created alert
    modal.onDidDismiss(alert => {
      if (alert) {
        this.alert = alert;
        console.log(this.alert);
        this.save(this.alert).then().catch(e => console.log(e));
      }

    });



  }
  async save(alert: Alert) {
    // save alert to database
    if (this.authenticatedUser) {
      const result = await this.data.saveAlert(this.authenticatedUser, this.alert);
      if (result) {
        this.toast.create({
          message: 'Alert Successfully Saved',
          duration: 2000
        }).present();
      }
      else {
        this.toast.create({
          message: 'An error has occurred. Please check your Internet connection.',
          duration: 3000
        }).present();
      }
    }
  }

   async updateAlert(alert: Alert) {
    if (this.authenticatedUser) {
      const result = await this.data.updateAlert(this.authenticatedUser, alert);
      if (!result) {
        this.toast.create({
          message: 'An error has occurred.',
          duration: 3000
        }).present();
      }
    }
   }

   editAlert(alert) {
    const modal: Modal = this.modal.create('AddAlertPage', {data: alert});
    modal.present();
    // get the created alert
    modal.onDidDismiss(alert => {
      if (alert) {
        this.alert = alert;
        console.log(this.alert);
        this.updateAlert(this.alert).then().catch(e => console.log(e));
      }

    });
   }

  ngOnDestroy(): void {
    this.authenticatedUser$.unsubscribe();
  }
}
