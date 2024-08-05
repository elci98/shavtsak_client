import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import {input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [
		MatToolbarModule,
		MatIconModule,
		MatDividerModule,
		MatButtonModule,
		CommonModule
	],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss'
})
export class HeaderComponent {

	isloggedIn = input.required<boolean>();

	@Output() signOutEvent: EventEmitter<void>= new EventEmitter();
	constructor(private router: Router){}

	navigate(path:string){
		if(!path){
			this.signOutEvent.emit();
		}
		this.router.navigate([`/${path}`]);
	}

	get url(){
		return this.router.url;
	}
}
