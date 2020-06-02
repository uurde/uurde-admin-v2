import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment'; 
import { ModalModule } from 'ngx-bootstrap/modal';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';

import { AppComponent } from './app.component';

import { HomeComponent } from './components/secured/home/home.component';
import { LoginComponent } from './components/public/login/login.component';
import { BookComponent } from './components/secured/book/book.component';
import { ContactComponent } from './components/secured/contact/contact.component';
import { LogComponent } from './components/secured/log/log.component';
import { MovieComponent } from './components/secured/movie/movie.component';
import { ProjectComponent } from './components/secured/project/project.component';
import { ResumeComponent } from './components/secured/resume/resume.component';
import { SkillComponent } from './components/secured/skill/skill.component';
import { UserComponent } from './components/secured/user/user.component';
import { VinylComponent } from './components/secured/vinyl/vinyl.component';

import { BookService } from './services/book.service';
import { ContactService } from './services/contact.service';
import { LogService } from 'src/app/services/log.service';
import { MovieService } from './services/movie.service';
import { ProjectService } from './services/project.service';
import { ResumeService } from './services/resume.service';
import { SkillService } from './services/skill.service';
import { UserService } from './services/user.service';
import { VinylService } from './services/vinyl.service';
import { IotService } from './services/iot.service';
import { AuthguardService } from './services/authguard.service';
import { VinylFormComponent } from './components/secured/vinyl/vinyl-form/vinyl-form.component';
import { BookFormComponent } from './components/secured/book/book-form/book-form.component';
import { MovieFormComponent } from './components/secured/movie/movie-form/movie-form.component';
import { ProjectFormComponent } from './components/secured/project/project-form/project-form.component';
import { ResumeFormComponent } from './components/secured/resume/resume-form/resume-form.component';
import { SkillFormComponent } from './components/secured/skill/skill-form/skill-form.component';
import { ContactFormComponent } from './components/secured/contact/contact-form/contact-form.component';
import { UserFormComponent } from './components/secured/user/user-form/user-form.component';
import { IotDeviceComponent } from './components/secured/iot/iot-device/iot-device.component';
import { IotDeviceMessagesComponent } from './components/secured/iot/iot-device-messages/iot-device-messages.component';
import { IotHubComponent } from './components/secured/iot/iot-hub/iot-hub.component';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { SearchPipe } from './shared/search/search.pipe';
import { IotDeviceFormComponent } from './components/secured/iot/iot-device/iot-device-form/iot-device-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    BookComponent,
    ContactComponent,
    LogComponent,
    MovieComponent,
    ProjectComponent,
    ResumeComponent,
    SkillComponent,
    UserComponent,
    VinylComponent,
    VinylFormComponent,
    BookFormComponent,
    MovieFormComponent,
    ProjectFormComponent,
    ResumeFormComponent,
    SkillFormComponent,
    ContactFormComponent,
    UserFormComponent,
    PaginationComponent,
    SearchPipe,
    IotDeviceComponent,
    IotDeviceMessagesComponent,
    IotHubComponent,
    IotDeviceFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    SweetAlert2Module.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    ModalModule.forRoot(),
    JwBootstrapSwitchNg2Module
  ],
  providers: [
    BookService,
    ContactService,
    LogService,
    MovieService,
    ProjectService,
    ResumeService,
    SkillService,
    UserService,
    VinylService,
    AuthguardService,
    IotService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {

  }
}
