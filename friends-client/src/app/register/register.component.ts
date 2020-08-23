import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

	public registerForm: FormGroup;
	model: any = {};

	constructor(private _fb: FormBuilder, private _router: Router, private _auth: AuthService) { }

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
		if (this.registerForm.valid) {
			this.model = Object.assign({}, this.registerForm.value)
			this._auth.register(this.model).subscribe(
				() => {
					console.log(`Register Successful`);
				},
				(error) => {
					console.log(error);
				}, () => {
					this._auth.login(this.model).subscribe(() => {
						this._router.navigate(['members']);
					});
				}
			);
		}
	}
}
