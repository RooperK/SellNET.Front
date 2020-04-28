import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AdvertisementComponent } from './pages/advertisement/advertisement.component';
import { AdvertisementCardComponent } from './components/advertisement-card/advertisement-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import {ReactiveFormsModule} from '@angular/forms';
import { EdititemComponent } from './pages/edititem/edititem.component';
import { AdditemComponent } from './pages/additem/additem.component';
import { CategoryChooserComponent } from './components/category-chooser/category-chooser.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { RecaptchaModule, RecaptchaFormsModule} from 'ng-recaptcha';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';
import { NgxMaskModule } from 'ngx-mask';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { DashboardFilteredComponent } from './pages/dashboard-filtered/dashboard-filtered.component';
import {MatTreeModule} from '@angular/material/tree';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {AutosizeModule} from 'ngx-autosize';
import {FileUploadModule} from 'ng2-file-upload';
import {NgxDadataModule} from '@kolkov/ngx-dadata';
import { ErrorComponent } from './components/error/error.component';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { CommentBoxComponent } from './components/comment-box/comment-box.component';
import { AdvertisementLongCardComponent } from './components/advertisement-long-card/advertisement-long-card.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { HowtoComponent } from './pages/howto/howto.component';
import { AboutComponent } from './pages/about/about.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AfterSignUpComponent } from './pages/after-sign-up/after-sign-up.component';
import { ConfirmComponent } from './pages/confirm/confirm.component';
import { RestoreComponent } from './pages/restore/restore.component';
import { AfterRestoreComponent } from './pages/after-restore/after-restore.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    AdvertisementComponent,
    AdvertisementCardComponent,
    FooterComponent,
    HeaderComponent,
    ProfileComponent,
    EdititemComponent,
    AdditemComponent,
    CategoryChooserComponent,
    ImageUploadComponent,
    CategoryFilterComponent,
    DashboardFilteredComponent,
    ErrorComponent,
    CommentCardComponent,
    CommentBoxComponent,
    AdvertisementLongCardComponent,
    HowtoComponent,
    AboutComponent,
    EditUserComponent,
    AfterSignUpComponent,
    ConfirmComponent,
    RestoreComponent,
    AfterRestoreComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        CloudinaryModule.forRoot(Cloudinary, {cloud_name: 'dennztta6', upload_preset: 'ml_default'}),
        NgxMaskModule.forRoot(),
        BrowserAnimationsModule,
        MatTreeModule,
        MatIconModule,
        MatButtonModule,
        AutosizeModule,
        FileUploadModule,
        NgxDadataModule,
        NgbCarouselModule,
      InfiniteScrollModule
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
