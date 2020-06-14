import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	model: any = {};

	constructor(private _auth: AuthService) { }

	ngOnInit(): void { }

	login() {
		console.log(this.model);
		this._auth.login(this.model).subscribe(
			(res) => {
				console.log('res', res);
			},
			(error) => {
				console.log('error', error);
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
