import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
	GoogleLoginProvider,
	FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import { SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { environment } from '../environment/environment';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }), 
		{provide: LocationStrategy, useClass: HashLocationStrategy},
		provideRouter(routes),
		provideClientHydration(),
		provideAnimations(),
		provideHttpClient(withFetch()),
		provideAnimationsAsync(),
		{
			provide: 'SocialAuthServiceConfig',
			useValue: {
				autoLogin: false,
				lang: 'en',
				providers: [
					{
						id: GoogleLoginProvider.PROVIDER_ID,
						provider: new GoogleLoginProvider(environment.google_id)
					},
					{
						id: FacebookLoginProvider.PROVIDER_ID,
						provider: new FacebookLoginProvider('clientId')
					}
				],
				onError: (err) => {
					console.error(err);
				}
			} as SocialAuthServiceConfig,
		}
	]
};
