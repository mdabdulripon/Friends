import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';

import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{
		path: '',
		runGuardsAndResolvers: 'always',
		canActivate: [AuthGuard],
		children: [
			{ path: 'members', component: MemberListComponent, resolve: { users: MemberListResolver } },
			{ path: 'members/:id', component: MemberDetailComponent, resolve: { user: MemberDetailResolver } },
			{ path: 'member/edit', component: MemberEditComponent, resolve: { user: MemberEditResolver }, canDeactivate: [PreventUnsavedChangesGuard] },
			{ path: 'messages', component: MessagesComponent },
			{ path: 'lists', component: ListsComponent },
		]
	},
	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full',
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
