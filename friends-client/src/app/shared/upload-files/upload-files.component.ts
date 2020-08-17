import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';

import { UploadService } from 'src/app/_services/upload.service';

import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
	selector: 'app-upload-files',
	templateUrl: './upload-files.component.html',
	styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {

	@ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;
	public files = [];

	constructor(private _upload: UploadService) { }

	ngOnInit(): void {
	}

	uploadFile(file) {
		const formData = new FormData();
		formData.append('file', file.data);
		file.inProgress = true;

		this._upload.upload(formData).pipe(
			map(event => {
				switch (event.type) {
					case HttpEventType.UploadProgress:
						file.progress = Math.round(event.loaded * 100 / event.total);
						break;
					case HttpEventType.Response:
						return event;
				}
			}),
			catchError((error: HttpErrorResponse) => {
				file.inProgress = false;
				return of(`${file.data.name} upload failed.`);
			})).subscribe();
	}


	private uploadFiles() {
		this.fileUpload.nativeElement.value = '';
		this.files.forEach(file => {
			this.uploadFile(file);
		});
	}

	onClick() {
		const fileUpload = this.fileUpload.nativeElement;
		fileUpload.onchange = () => {
			for (let index = 0; index < fileUpload.files.length; index++) {
				const file = fileUpload.files[index];
				this.files.push({ data: file, inProgress: false, progress: 0 });
			}
			this.uploadFiles();
		};
		fileUpload.click();
	}

}
