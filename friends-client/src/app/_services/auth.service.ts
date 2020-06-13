import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	baseUrl: string = 'http://localhost:5000/api/auth/';
	constructor(private _http: HttpClient) {}

	login(model: any) {
		return this._http.post(this.baseUrl + 'login', model).pipe(
			map((res: any) => {
				if (res) {
					localStorage.setItem('token', res.token);
				}
			})
		);
	}

	register(model: any) {
		return this._http.post(this.baseUrl + 'register', model);
	}
}