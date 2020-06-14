import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
	public isNavOpen: boolean = false;
	userName: string = 'account';
	helper = new JwtHelperService();


	constructor(private _auth: AuthService) { }

	ngOnInit() {
		const token = localStorage.getItem('token');
		if (token) {
			this._auth.decodedToken = this.helper.decodeToken(token);
			this.userName = this._auth.decodedToken.unique_name;
		}
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
		localStorage.removeItem('token');
	}
}
