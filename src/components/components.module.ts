import { NgModule } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form';
import { RegisterFormComponent } from './register-form/register-form';
import { EditProfileFormComponent } from './edit-profile-form/edit-profile-form';
import { ProfileViewComponent } from './profile-view/profile-view';
import { FormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
@NgModule({
    declarations: [
        LoginFormComponent,
        RegisterFormComponent,
        EditProfileFormComponent,
        ProfileViewComponent
    ],
    imports: [
        FormsModule,
        IonicModule
    ],
    exports: [
        LoginFormComponent,
        RegisterFormComponent,
        EditProfileFormComponent,
        ProfileViewComponent
    ]
})
export class ComponentsModule { }
