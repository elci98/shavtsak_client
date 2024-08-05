import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RestProxyService } from '../../services/rest-proxy.service';
import { catchError, of } from 'rxjs';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	standalone: true,
	imports: [
		MatCardModule,
		MatFormFieldModule,
		GoogleSigninButtonModule,
		MatInputModule,
		MatButtonModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatIconModule,
		MatTooltip
	],
	styleUrl: './login.component.scss',
})
export class LoginComponent {
	private _username = '';
	private _password = '';
	loginForm: FormGroup;
	passwordPattern = '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$';
	error = new ErrorStateMatcher();
	errorMessage = signal('');

	constructor(
    private socialAuth: SocialAuthService,
    private auth: AuthService,
    private router: Router,
	private restproxy: RestProxyService
	) {		
		this.loginForm = new FormGroup({
			username: new FormControl(this._username, [Validators.required, Validators.email]),
			password: new FormControl(this._password, [
				Validators.required,
				Validators.pattern(this.passwordPattern),
			]),
		});
	}
	ngOnInit() {
		this.socialAuth.authState.subscribe((res: SocialUser) => {
			console.log(res);
			this.auth.socialLogin(res).subscribe({
				next: (loginRes: any) => {
					console.log('User payload from Google: ', loginRes);
					this.router.navigate(['/']);
				},
				error: (error: any) => {
					console.log(
						'Something ain\'t right!',
						`The error is: ${error.error.message}`
					);
				},
			});
		});

	}
	onLoginClicked(){
		const credentials = {
			username: this.username?.value,
			password: this.password?.value
		};
		this.restproxy.login(credentials).pipe(
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			catchError(err=>{
				this.errorMessage.set('Wrong credentials, Please try again.');
				return of();
			})
		).subscribe((res:any)=>{
			this.errorMessage.set('');
			this.auth.setAuthToken(res.access_token, res.refresh_token);
			this.router.navigate(['/']);
		});

	}

	onRegisterClicked(){
		this.router.navigate(['auth/register']);
	}

	get username() {
		return this.loginForm?.get('username');
	}

	get password() {
		return this.loginForm?.get('password');
	}
	
	get formValid(){
		return this.loginForm.status === 'VALID';
	}
}
