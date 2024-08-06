/* eslint-disable quotes */
// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { RestProxyService } from './rest-proxy.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private access_token = 'access_token';
	private refresh_token = 'refresh_token';
	private user_data = 'user';

	constructor(private restProxy: RestProxyService) { }

	public getAuthorizationHeader(): HttpHeaders {
		const authToken = this.getAuthToken();
		return new HttpHeaders({ Authorization: `JWT ${authToken}` });
	}

	public getAuthToken(): string | null {
		return localStorage.getItem(this.access_token);
	}

	public setAuthToken(token: string, refresh: string): void {
		localStorage.setItem(this.access_token, token);
		localStorage.setItem(this.refresh_token, refresh);
		localStorage.setItem('tokenTime', new Date().getTime().toString());
	}

	/**
   * Social login for Google specifically
   * @param id_token Token gotten from first step social google auth
   * @returns HttpClient `Observable`
   */
	public socialLogin(user: any) {
		const payload = {
			...user,
			"jwt": user.id_token
		};
		return this.restProxy.socialLogin(payload).pipe(
			tap((res: any) => 
				this.setAuthToken(res.access_token, res.refresh_token)
			),
			catchError((error: HttpErrorResponse) => {
				return throwError(() => error);
			})
		);
	}

	// verify(uid: string | null, token: string | null) {
	// 	const loginUrl = `${this.apiUrl}/auth/users/activation/`;
	// 	const verifyPayload = { uid, token };
	// 	return this.http.post(loginUrl, verifyPayload);
	// }

	// resend(email: string) {
	// 	const resendUrl = `${this.apiUrl}/auth/users/resend_activation/`;
	// 	const loginPayload = { email };
	// 	return this.http.post(resendUrl, loginPayload);
	// }

	logout() {
		return localStorage.clear();
	}

	isAuth() {
		const token = this.getAuthToken();

		const tokenTime = localStorage.getItem('tokenTime');
		const currentTime = new Date().getTime();
		const tokenDuration =  15 * 60 * 1000; // 15 minutes in milliseconds

		if (token && tokenTime) {
			const timeDiff = currentTime - Number(tokenTime);
			if (timeDiff > tokenDuration) {
				localStorage.clear();
				return false;
			}
		}

		const isAuthenticated = !!token;
		return isAuthenticated;
	}
}
