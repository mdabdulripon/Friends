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
	public slides: any[] = [];

	constructor(
		private _http: HttpClient,
		private _user: UserService,
		private _route: ActivatedRoute) { }

	ngOnInit(): void {
		this._route.data.subscribe(res => {
			this.user = res.user;
			this.slides = this.user.photos;
			if (this.user.photoUrl === null) {
				this.user.photoUrl = '../../../assets/user.png';
			}
		});
	}
}
