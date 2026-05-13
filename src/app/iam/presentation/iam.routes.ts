import { Routes } from '@angular/router';

const signInHome = () =>
  import('./views/sign-in-home/sign-in-home.component').then(module => module.SignInHomeComponent);

const signIn = () =>
  import('./views/sign-in/sign-in.component').then(module => module.SignInComponent);

const signUp = () =>
  import('./views/sign-up/sign-up.component').then(module => module.SignUpComponent);

const dermatologistSignIn = () =>
  import('./views/dermatologist-sign-in/dermatologist-sign-in.component').then(module => module.DermatologistSignInComponent);

const dermatologistSignUp = () =>
  import('./views/dermatologist-sign-up/dermatologist-sign-up.component').then(module => module.DermatologistSignUpComponent);

/**
 * Route tree for IAM presentation views.
 *
 * @remarks
 * Provides the entry routes for the authentication flows of the platform,
 * separating the young adult patient flows from the certified dermatologist
 * specialist flows. The default child route renders the sign-in hub, which
 * is the first screen the user sees after opening the application.
 */
export const iamRoutes: Routes = [
  { path: 'sign-in-home',          loadComponent: signInHome           },
  { path: 'sign-in',               loadComponent: signIn               },
  { path: 'sign-up',               loadComponent: signUp               },
  { path: 'dermatologist-sign-in', loadComponent: dermatologistSignIn  },
  { path: 'dermatologist-sign-up', loadComponent: dermatologistSignUp  },
  { path: '',                      redirectTo: 'sign-in-home', pathMatch: 'full' },
];
