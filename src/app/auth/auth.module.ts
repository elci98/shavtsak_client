import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GoogleSigninButtonModule, SocialLoginModule } from '@abacritt/angularx-social-login';
import { provideHttpClient } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';

@NgModule({
	declarations: [
	],
	providers: [
		provideHttpClient()
	],
	imports: [
		LoginComponent,
		RegisterComponent,
		CommonModule,
		AuthRoutingModule,
		RouterModule,
		FormsModule,
		SocialLoginModule,
		GoogleSigninButtonModule,
	]
})
export class AuthModule { }