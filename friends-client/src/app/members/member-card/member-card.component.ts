import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';

@Component({
	selector: 'app-member-card',
	templateUrl: './member-card.component.html',
	styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {
	@Input() user: User;

	constructor() { }

	ngOnInit() {
		if (this.user.photoUrl === null) {
			this.user.photoUrl = '../../../assets/user.png';
		}
	}
}
