import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatModule } from './shared/mat/mat.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './_services/auth.service';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { ErrorInterceptorProvider } from './_services/error.interceptor';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		NavbarComponent,
		FooterComponent,
		LoginComponent,
		RegisterComponent,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		RouterModule,
		AppRoutingModule,
		FormsModule,
		BrowserAnimationsModule,
		MatModule,
	],
	providers: [
		AuthService,
		ErrorInterceptorProvider
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
