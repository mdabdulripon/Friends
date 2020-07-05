import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
	selector: 'app-member-edit',
	templateUrl: './member-edit.component.html',
	styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {

	@ViewChild('editProfileForm') editForm: NgForm;
	public user: User;

	// prevent close the window
	@HostListener('window:beforeunload', ['$event'])
	unloadNotification($event: any) {
		if (this.editForm.dirty) {
			$event.returnValue = true;
		}
	}

	constructor(
		private _userService: UserService,
		private _authService: AuthService,
		private _route: ActivatedRoute) { }

	ngOnInit(): void {
		this._route.data.subscribe(res => {
			this.user = res.user
		});
	}

	updateUser() {
		const id = this._authService.decodedToken.nameid;
		console.log("****", this._authService.decodedToken);
		this._userService.updateUser(id, this.user).subscribe(res => {
			console.log("----> res", res);
			// reset the form
		}, error => {
			console.log("----> res", error);
		});
	}
}
