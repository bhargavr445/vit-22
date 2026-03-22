import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideSignalFormsConfig, SignalFormsConfig } from '@angular/forms/signals';

const NG_STATUS_CLASSES: SignalFormsConfig['classes'] = {
  'ng-touched': ({state}) => state().touched(),
  'ng-untouched': ({state}) => !state().touched(),
  'ng-dirty': ({state}) => state().dirty(),
  'ng-pristine': ({state}) => !state().dirty(),
  'ng-valid': ({state}) => state().valid(),
  'ng-invalid': ({state}) => state().invalid(),
  'ng-pending': ({state}) => state().pending(),
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideSignalFormsConfig({ classes: NG_STATUS_CLASSES })
  ]
};
