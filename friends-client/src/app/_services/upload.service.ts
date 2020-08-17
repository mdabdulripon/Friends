import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class UploadService {

	baseUrl: string = environment.apiURL;

	constructor(private _http: HttpClient, private _auth: AuthService) { }

	public upload(formData) {
		const id = this._auth.decodedToken.nameid;
		return this._http.post<any>(`${this.baseUrl}/users/${id}/photos`, formData, {
			reportProgress: true,
			observe: 'events'
		});
	}
}
