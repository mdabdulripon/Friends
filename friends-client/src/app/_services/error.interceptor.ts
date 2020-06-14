import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
	HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor() { }

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError((error: any) => {
				// For unauthorize
				if (error.status === 401) {
					return throwError(error.statusText);
				}

				if (error instanceof HttpErrorResponse) {
					const applicationError = error.headers.get('Application-Error');
					if (applicationError) {
						return throwError(applicationError);
					}
					const validationError = error.error;
					console.log('***********************', error);
					let modalStateErrors = '';
					if (validationError.errors && typeof validationError.errors === 'object') {
						for (let key in validationError.errors) {
							if (validationError.errors[key]) {
								modalStateErrors += validationError.errors[key] + '\n';
							}
						}
					}
					return throwError(modalStateErrors || validationError || 'Something went wrong!');
				}
			})
		);
	}
}

export const ErrorInterceptorProvider = {
	provide: HTTP_INTERCEPTORS,
	useClass: ErrorInterceptor,
	multi: true,
};
