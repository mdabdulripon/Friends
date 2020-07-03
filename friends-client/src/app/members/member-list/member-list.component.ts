import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-member-list',
	templateUrl: './member-list.component.html',
	styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

	public users: User[] = [];

	constructor(private _user: UserService, private _route: ActivatedRoute) { }

	ngOnInit(): void {
		this._route.data.subscribe(res => {
			this.users = res.users;
			console.log("users", this.users);
		})
	}
}
