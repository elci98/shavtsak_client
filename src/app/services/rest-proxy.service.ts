import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class RestProxyService {

	constructor(private httpClient: HttpClient) {}

	login(credentials: {username: string, password:string}){
		return this.httpClient.post('api/auth/login', credentials,{
			headers: {
				'content-type':'application/json'
			}
		});
	}
	
	socialLogin(payload:any) {
		return this.httpClient.post(`api/auth/login/google?id=${payload.id}`, payload);
	}
	
	register(credentials: {username: string, email:string, password:string}){
		return this.httpClient.post('api/auth/register', credentials,{
			headers: {
				'content-type':'application/json'
			}
		});
		
	}
}
