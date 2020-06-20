import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
	providedIn: 'root'
})

export class AuthGuard implements CanActivate {
	constructor(private _auth: AuthService, private _router: Router) {

	}
	canActivate(): boolean {
		if (this._auth.isLoggedIn()) {
			return true;
		}
		// Todo: have toster alert
		this._router.navigate(['/']);
		return false
	}
}
