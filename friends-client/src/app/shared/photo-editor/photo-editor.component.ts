import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Photo } from 'src/app/_models/Photo';

@Component({
	selector: 'app-photo-editor',
	templateUrl: './photo-editor.component.html',
	styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {

	@Input() photos: Photo[];
	currentMainPhoto: any;

	constructor(private _userService: UserService, private _authService: AuthService) { }

	ngOnInit(): void {
	}

	setMainPhoto(photo: Photo) {
		this._userService.setMainPhoto(this._authService.decodedToken.nameid, photo.id)
			.subscribe(res => {
				this.currentMainPhoto = this.photos.filter(p => p.isMain === true)[0];
				this.currentMainPhoto = false;
				photo.isMain = true;
			}, error => {
				console.log(`An Error happened`, error);
			})
	}
}
