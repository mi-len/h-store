import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([])
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }
