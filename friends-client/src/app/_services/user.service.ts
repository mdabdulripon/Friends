import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

const httpOptions = {
	headers: new HttpHeaders({
		'Authorization': 'Bearer ' + localStorage.getItem('token')
	})
};

@Injectable({
	providedIn: 'root'
})
export class UserService {
	baseUrl: string = environment.apiURL;

	constructor(private _http: HttpClient) { }

	getUsers(): Observable<User[]> {
		return this._http.get<User[]>(`${this.baseUrl}/users`, httpOptions);
	}

	getUser(id): Observable<User> {
		return this._http.get<User>(`${this.baseUrl}/users/{id}`, httpOptions);
	}
}
