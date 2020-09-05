import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	baseUrl: string = environment.apiURL;

	constructor(private _http: HttpClient) { }

	getUsers(pageNumber?, pageSize?): Observable<PaginatedResult<User[]>> {
		const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
		let params = new HttpParams();

		if (pageNumber !== null && pageSize !== null) {
			params = params.append('pageNumber', pageNumber);
			params = params.append('pageSize', pageSize);
		}
		return this._http.get<User[]>(`${this.baseUrl}/users`, { observe: 'response', params }).pipe(
			map(res => {
				paginatedResult.result = res.body;
				const pagination = res.headers.get('Pagination');
				if (pagination !== null) {
					paginatedResult.pagination = JSON.parse(pagination)
				}
				return paginatedResult;
			})
		);
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
