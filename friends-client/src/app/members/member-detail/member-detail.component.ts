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
		// get data from resolver 
		this._route.data.subscribe(res => {
			this.user = res.user;
		})
	}

	slides = [
		{
			url: 'https://claremurthy.com/wp-content/uploads/2018/04/6-month-baby-photos-3.jpg'
		},
		{
			url: 'https://claremurthy.com/wp-content/uploads/2018/04/6-month-baby-photos-1.jpg'
		},
		{
			url: 'https://i1.wp.com/ideasfornames.com/wp-content/uploads/2019/09/shutterstock_1458206714.jpg?ssl=1'
		},
		{
			url: 'https://cdn1.evoke.ie/wp-content/uploads/2018/04/shutterstock_97285895-baby-skin-feat-696x503.jpg'
		}
	]
}
