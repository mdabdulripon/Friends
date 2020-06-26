import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
	selector: 'app-member-list',
	templateUrl: './member-list.component.html',
	styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

	public users: User[] = [];

	constructor(private _user: UserService) { }

	ngOnInit(): void {
		this.getUsers();
	}

	getUsers() {
		this._user.getUsers().subscribe(res => {
			if (res) {
				this.users = res;
				console.log("users", this.users);
			}
		}, error => {
			console.log(`Error:`, error)
		}, () => {
			console.log(`Complete`)
		});
	}

}
