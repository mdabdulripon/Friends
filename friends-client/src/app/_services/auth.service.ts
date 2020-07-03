import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	baseUrl: string = `${environment.apiURL}/auth/`
	helper = new JwtHelperService();
	decodedToken: any;

	constructor(private _http: HttpClient) { }


	login(model: any) {
		console.log("AuthService -> login -> this.baseUrl", this.baseUrl)
		return this._http.post(this.baseUrl + 'login', model).pipe(
			map((res: any) => {
				if (res) {
					// ? Set token to the local storage
					localStorage.setItem('token', res.token);
					// ? Decoded token 
					this.decodedToken = this.helper.decodeToken(res.token);
					console.log("this.decodedToken", this.decodedToken)
				}
			})
		);
	}

	register(model: any) {
		return this._http.post(this.baseUrl + 'register', model);
	}

	isLoggedIn() {
		// ? Get the token from local storage
		const token = localStorage.getItem('token');
		// ? Check the token is expired or not.
		return !this.helper.isTokenExpired(token);
	}
}
