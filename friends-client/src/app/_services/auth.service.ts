import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	baseUrl: string = `${environment.apiURL}/auth/`
	helper = new JwtHelperService();
	decodedToken: any;
	currentUser: User;

	public photoUrl$ = new BehaviorSubject<string>(null);
	public currentPhotoUrl$ = this.photoUrl$.asObservable();

	constructor(private _http: HttpClient) { }

	changeMemberPhoto(photoUrl: string) {
		this.photoUrl$.next(photoUrl);
	}

	login(model: any) {
		return this._http.post(this.baseUrl + 'login', model).pipe(
			map((res: any) => {
				if (res) {
					// ? Set token to the local storage
					localStorage.setItem('user', JSON.stringify(res.userInfo));
					localStorage.setItem('token', res.token);
					// ? Decoded token 
					this.decodedToken = this.helper.decodeToken(res.token);
					this.currentUser = res.userInfo;
					this.changeMemberPhoto(this.currentUser.photoUrl);
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
