import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
	model: any = {};

	constructor(private _auth: AuthService) {}

	ngOnInit(): void {}

	register() {
		console.log(`register`);
		this._auth.register(this.model).subscribe(
			() => {
				console.log(`Register Successful`);
			},
			(error) => {
				console.log(error);
			}
		);
	}

	cancel() {
		console.log(`cancel`);
	}
}
