import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Photo } from 'src/app/_models/Photo';

@Component({
	selector: 'app-photo-editor',
	templateUrl: './photo-editor.component.html',
	styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent {
	@Input() photos: Photo[];
	public currentMainPhoto: any;

	constructor(private _user: UserService, private _auth: AuthService) { }

	setMainPhoto(photo: Photo) {
		this._user.setMainPhoto(this._auth.decodedToken.nameid, photo.id)
			.subscribe(res => {
				this.currentMainPhoto = this.photos.filter(p => p.isMain === true)[0];
				this.currentMainPhoto = false;
				photo.isMain = true;
				this._auth.changeMemberPhoto(photo.url);
				this._auth.currentUser.photoUrl = photo.url;
				localStorage.setItem('user', JSON.stringify(this._auth.currentUser));
			}, error => {
				console.log(`Error:`, error);
			})
	}

	deletePhoto(id: number) {
		this._user.deletePhoto(this._auth.decodedToken.nameid, id).subscribe(res => {
			const idx = this.photos.findIndex(p => p.id === id);
			this.photos.splice(idx, 1);
		}, error => {
			console.log(`Error:`, error);
		});
	}
}
