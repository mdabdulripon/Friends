import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class MemberListResolver implements Resolve<User[]> {

    public pageNumber: number = 1;
    public pageSize: number = 8;

    constructor(private _userService: UserService, private _router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this._userService.getUsers(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                console.log(`Problem retrieving the data`);
                this._router.navigate(['/'])
                return of(null);
            })
        )
    }

}