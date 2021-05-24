import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthguardService } from './services/authguard.service';

import { LoginComponent } from 'src/app/components/public/login/login.component';
import { HomeComponent } from 'src/app/components/secured/home/home.component';
import { SkillComponent } from './components/secured/skill/skill.component';
import { ResumeComponent } from './components/secured/resume/resume.component';
import { ProjectComponent } from './components/secured/project/project.component';
import { VinylComponent } from './components/secured/vinyl/vinyl.component';
import { MovieComponent } from './components/secured/movie/movie.component';
import { BookComponent } from './components/secured/book/book.component';
import { LogComponent } from './components/secured/log/log.component';
import { UserComponent } from './components/secured/user/user.component';
import { VinylFormComponent } from './components/secured/vinyl/vinyl-form/vinyl-form.component';
import { SkillFormComponent } from './components/secured/skill/skill-form/skill-form.component';
import { ResumeFormComponent } from './components/secured/resume/resume-form/resume-form.component';
import { ProjectFormComponent } from './components/secured/project/project-form/project-form.component';
import { MovieFormComponent } from './components/secured/movie/movie-form/movie-form.component';
import { BookFormComponent } from './components/secured/book/book-form/book-form.component';
import { ContactComponent } from './components/secured/contact/contact.component';
import { ContactFormComponent } from './components/secured/contact/contact-form/contact-form.component';
import { UserFormComponent } from './components/secured/user/user-form/user-form.component';
import { IotDeviceComponent } from './components/secured/iot/iot-device/iot-device.component';
import { IotDeviceMessagesComponent } from './components/secured/iot/iot-device-messages/iot-device-messages.component';
import { IotHubComponent } from './components/secured/iot/iot-hub/iot-hub.component';
import { CryptoComponent } from './components/secured/crypto/crypto.component';
import { CryptoConfigComponent } from './components/secured/crypto/crypto-config/crypto-config.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: HomeComponent, canActivate: [AuthguardService],
    children: [
      //{ path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'skill/:id', component: SkillFormComponent },
      { path: 'skill/new', component: SkillFormComponent },
      { path: 'skill', component: SkillComponent },
      { path: 'resume/:id', component: ResumeFormComponent },
      { path: 'resume/new', component: ResumeFormComponent },
      { path: 'resume', component: ResumeComponent },
      { path: 'project/:id', component: ProjectFormComponent },
      { path: 'project/new', component: ProjectFormComponent },
      { path: 'project', component: ProjectComponent },
      { path: 'vinyl/:id', component: VinylFormComponent },
      { path: 'vinyl/new', component: VinylFormComponent },
      { path: 'vinyl', component: VinylComponent },
      { path: 'movie/:id', component: MovieFormComponent },
      { path: 'movie/new', component: MovieFormComponent },
      { path: 'movie', component: MovieComponent },
      { path: 'book/:id', component: BookFormComponent },
      { path: 'book/new', component: BookFormComponent },
      { path: 'book', component: BookComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'contact/:id', component: ContactFormComponent },
      { path: 'log', component: LogComponent },
      { path: 'user/:id', component: UserFormComponent },
      { path: 'user/new', component: UserFormComponent },
      { path: 'user', component: UserComponent },
      // { path: 'profile', component: UserProfileComponent },
      { path: 'iot-device', component: IotDeviceComponent },
      { path: 'iot-device-message', component: IotDeviceMessagesComponent },
      { path: 'iot-hub', component: IotHubComponent },
      { path: 'crypto', component: CryptoComponent },
      { path: 'crypto-config', component: CryptoConfigComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
