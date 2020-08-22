import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

	public registerForm: FormGroup;
	model: any = {};

	constructor(private _fb: FormBuilder, private _auth: AuthService) { }

	ngOnInit() {
		this.formBuilder();
	}

	// convenience getter for easy access to form fields
	get field() { return this.registerForm.controls; }

	formBuilder() {
		this.registerForm = this._fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
			confirmPassword: ['', Validators.required]
		}, { validator: this.passwordMatchValidator });
	}

	passwordMatchValidator(fg: FormGroup) {
		const password = fg.get('password');
		const confirmPassword = fg.get('confirmPassword');
		if (password.value !== confirmPassword.value) {
			return confirmPassword.setErrors({ invalid: true });
		} else {
			return confirmPassword.setErrors(null);
		}
	}

	register() {
		console.log(this.registerForm.value);
		// console.log(`register`);
		// this._auth.register(this.model).subscribe(
		// 	() => {
		// 		console.log(`Register Successful`);
		// 	},
		// 	(error) => {
		// 		console.log(error);
		// 	}
		// );
	}
}
