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
	public photoUrl: string;

	// prevent close the window
	@HostListener('window:beforeunload', ['$event'])
	unloadNotification($event: any) {
		if (this.editForm.dirty) {
			$event.returnValue = true;
		}
	}

	constructor(
		private _userService: UserService,
		private _auth: AuthService,
		private _route: ActivatedRoute) { }

	ngOnInit(): void {
		this._route.data.subscribe(res => {
			this.user = res.user;
			if (this.user.photoUrl === null) {
				this.user.photoUrl = '../../../assets/user.png';
			}
		});
		this._auth.currentPhotoUrl$.subscribe(res => this.photoUrl = res);
	}

	updateUser() {
		const id = this._auth.decodedToken.nameid;
		this._userService.updateUser(id, this.user).subscribe(res => {
			console.log("----> res", res);
			// reset the form
		}, error => {
			console.log("----> res", error);
		});
	}

	onImageUploaded(event) {
		this.user.photos.push(event);
	}
}
