import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	model: any = {};

	constructor(private _auth: AuthService, private _router: Router) { }

	ngOnInit(): void { }

	login() {
		this._auth.login(this.model).subscribe(
			(res) => {
				// TODO:  Add toster alert and remove the console.
				console.log('res', res);
			},
			(error) => {
				// TODO:  Add toster alert and remove the console.
				console.log('error', error);
			},
			() => {
				this._router.navigate(['members'])
			}
		);
	}

	loggedIn() {
		const token = localStorage.getItem('token');
		return !!token;
	}

	logout() {
		localStorage.removeItem('token');
	}
}
