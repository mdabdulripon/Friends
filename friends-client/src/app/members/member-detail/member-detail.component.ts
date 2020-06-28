import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
	selector: 'app-member-detail',
	templateUrl: './member-detail.component.html',
	styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {

	public user: User;
	constructor(
		private _http: HttpClient,
		private _user: UserService,
		private _route: ActivatedRoute) { }

	ngOnInit(): void {
		// get id from router params
		const id = +this._route.snapshot.params.id;
		console.log("MemberDetailComponent -> ngOnInit -> id", id);
		this.loadUser(id);
	}

	loadUser(id: number) {
		this._user.getUser(id).subscribe(res => {
			this.user = res;
			console.log("-> res", res);
		}, (error) => {
			console.log("-> error", error);
		}, () => {
			console.log("Load the single profile.");
		});
	}
}
