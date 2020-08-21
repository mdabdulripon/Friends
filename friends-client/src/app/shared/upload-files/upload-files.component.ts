import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';

import { UploadService } from 'src/app/_services/upload.service';

import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
	selector: 'app-upload-files',
	templateUrl: './upload-files.component.html',
	styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent {

	@ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;
	@Output() imageUploaded = new EventEmitter<any>();
	public files = [];

	constructor(private _upload: UploadService) { }

	onSubmit() {
		this.fileUpload.nativeElement.value = '';
		this.files.forEach(file => {
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
							this.imageUploaded.emit(event.body);
							this.onDelete(file);
							return event;
					}
				}),
				catchError((error: HttpErrorResponse) => {
					file.inProgress = false;
					return of(`${file.data.name} upload failed.`);
				})).subscribe();
		});
	}

	onClick() {
		const fileUpload = this.fileUpload.nativeElement;
		fileUpload.onchange = () => {
			for (let index = 0; index < fileUpload.files.length; index++) {
				const file = fileUpload.files[index];
				if (this.files.length > 0) {
					const idx = this.files.findIndex(f => f.data.name === file.name);
					if (idx === -1) {
						this.files.push({ data: file, inProgress: false, progress: 0 });
					}
				} else {
					this.files.push({ data: file, inProgress: false, progress: 0 });
				}
			}
		};
		fileUpload.click();
	}

	onDelete(file) {
		const idx = this.files.findIndex(f => f.data.name === file.data.name);
		this.files.splice(idx, 1);
	}
}
