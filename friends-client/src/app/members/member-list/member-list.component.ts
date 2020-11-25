import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';

@Component({
	selector: 'app-member-list',
	templateUrl: './member-list.component.html',
	styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

	public users: User[] = [];
	public pagination: Pagination;

	constructor(private _user: UserService, private _route: ActivatedRoute) { }

	ngOnInit(): void {
		this._route.data.subscribe(res => {
			this.users = res.users.result;
			this.pagination = res.users.pagination;
		})
	}

	onPageChange(event: any): void {
		console.log("event", event);
		console.log("pagination", this.pagination)
		this.pagination.currentPage = event.pageIndex + 1;
		this.pagination.itemsPerPage = event.pageSize;
		this.loadUser(this.pagination.currentPage, this.pagination.itemsPerPage);
	}

	loadUser(pageNumber: number, pageSize: number) {
		this._user.getUsers(pageNumber, pageSize).subscribe((res: PaginatedResult<User[]>) => {
			this.users = res.result;
			this.pagination = res.pagination;
		})
	}
}
