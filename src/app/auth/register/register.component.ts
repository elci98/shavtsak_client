import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { RestProxyService } from '../../services/rest-proxy.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatIconModule,
	],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss',
})
export class RegisterComponent {

	private _username = '';
	private _email = '';
	private _password = '';
	registerForm: FormGroup;
	passwordPattern = '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$';
	error = new ErrorStateMatcher();

	constructor(
    private auth: AuthService,
    private restproxy: RestProxyService,
    private router: Router,
	) {
		this.registerForm = new FormGroup({
			username: new FormControl(this._username, [Validators.required]),
			email: new FormControl(this._email, [Validators.required, Validators.email]),
			password: new FormControl(this._password, [
				Validators.required,
				Validators.pattern(this.passwordPattern),
			]),
		});
	}
	onRegisterClicked() {
		const credentials = {
			username: this.username?.value,
			email: this.email?.value,
			password: this.password?.value,
		};
		this.restproxy.register(credentials).subscribe((res: any) => {
			this.auth.setAuthToken(res.access_token, res.refresh_token);
			this.router.navigate(['/']);
		});
	}

	get username() {
		return this.registerForm?.get('username');
	}

	get email() {
		return this.registerForm?.get('email');
	}

	get password() {
		return this.registerForm?.get('password');
	}

	get formValid() {
		return this.registerForm.status === 'VALID';
	}
}
