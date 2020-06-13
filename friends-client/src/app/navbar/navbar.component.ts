import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
	public isNavOpen: boolean = false;
	constructor() {}

	ngOnInit() {}

	openNav() {
		this.isNavOpen = true;
	}

	closeNav() {
		this.isNavOpen = false;
	}

	loggedIn() {
		const token = localStorage.getItem('token');
		return !!token;
	}

	logout() {
		localStorage.removeItem('token');
		console.log('logout');
	}
}
