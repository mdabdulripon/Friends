import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { User } from '../_models/user';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
	public isNavOpen: boolean = false;
	public userEmail: string = 'account';
	public photoUrl: string;
	helper = new JwtHelperService();

	constructor(private _auth: AuthService, private _router: Router) { }

	ngOnInit() {
		const token = localStorage.getItem('token');
		/***
		 * ! this._auth.currentUser is a user  and the local storage we store as an string
		 * * Therefore we need convert the string to an object by using Json Parse  
		 * **/
		const user: User = JSON.parse(localStorage.getItem('user'));
		if (token) {
			this._auth.decodedToken = this.helper.decodeToken(token);
			this.userEmail = this._auth.decodedToken.email;
		}
		if (user) {
			this._auth.currentUser = user;
			this._auth.changeMemberPhoto(user.photoUrl);
		}

		this._auth.currentPhotoUrl$.subscribe(res => {
			this.photoUrl = res;
		});
	}

	openNav() {
		this.isNavOpen = true;
	}

	closeNav() {
		this.isNavOpen = false;
	}

	loggedIn() {
		return this._auth.isLoggedIn();
	}

	logout() {
		localStorage.removeItem('user');
		this._auth.currentUser = null;
		localStorage.removeItem('token');
		this._auth.decodedToken = null;
		this._router.navigate(['/']);
	}
}
