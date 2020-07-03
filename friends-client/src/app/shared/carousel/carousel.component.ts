import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-carousel',
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

	@Input() slides: any[];
	public slideIndex: number = 0;

	constructor() { }

	ngOnInit(): void {
		this.showSlides(this.slideIndex);
		console.log("Slide Index", this.slideIndex);
	}

	plusSlides(n) {
		this.showSlides(this.slideIndex += n);
	}

	currentSlide(n) {
		this.showSlides(this.slideIndex = n);
	}

	showSlides(n) {
		if (n >= this.slides.length) {
			this.slideIndex = 0;
		}
		if (n < 0) {
			this.slideIndex = this.slides.length - 1;
		}
	}
}
