import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatModule } from './shared/mat/mat.module';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';

import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { ListsComponent } from './lists/lists.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberCardComponent } from './members/member-card/member-card.component';

export function tokenGetter() {
	return localStorage.getItem('token');
}

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		NavbarComponent,
		FooterComponent,
		LoginComponent,
		RegisterComponent,
		ListsComponent,
		MemberListComponent,
		MessagesComponent,
		MemberCardComponent,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		RouterModule,
		AppRoutingModule,
		FormsModule,
		BrowserAnimationsModule,
		MatModule,
		JwtModule.forRoot({
			config: {
				tokenGetter: tokenGetter,
				whitelistedDomains: ["localhost:5000"],
				blacklistedRoutes: ["localhost:5000/api/auth"],
			},
		}),
	],
	providers: [
		ErrorInterceptorProvider
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
