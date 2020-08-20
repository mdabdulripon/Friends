import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	baseUrl: string = environment.apiURL;

	constructor(private _http: HttpClient) { }

	getUsers(): Observable<User[]> {
		return this._http.get<User[]>(`${this.baseUrl}/users`);
	}

	getUser(id): Observable<User> {
		return this._http.get<User>(`${this.baseUrl}/users/${id}`);
	}

	updateUser(id: number, user: User) {
		return this._http.put(`${this.baseUrl}/users/${id}`, user);
	}

	setMainPhoto(userId: number, id: number) {
		return this._http.post(`${this.baseUrl}/users/${userId}/photos/${id}/setMain`, {});
	}

	deletePhoto(userId: number, id: number) {
		return this._http.delete(`${this.baseUrl}/users/${userId}/photos/${id}`);
	}
}
