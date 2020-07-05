import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';


@Injectable()
export class MemberEditResolver implements Resolve<User> {

    constructor(private _auth: AuthService, private _userService: UserService, private _router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        const id = this._auth.decodedToken.nameid;
        return this._userService.getUser(id).pipe(
            catchError(error => {
                console.log(`Problem retrieving the data`);
                this._router.navigate(['/members'])
                return of(null);
            })
        )
    }

}