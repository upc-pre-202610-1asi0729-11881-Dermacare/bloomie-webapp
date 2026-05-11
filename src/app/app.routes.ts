import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dermatology',
    pathMatch: 'full',
  },
  {
    path: 'dermatology',
    loadChildren: () =>
      import('./dermatology-care/presentation/dermatology-care.routes').then(
        (m) => m.dermatologyCareRoutes,
      ),
  },
  {
    path: 'derm',
    loadChildren: () =>
      import('./dermatology-care/presentation/dermatology-care.routes').then((m) => m.dermRoutes),
  },
  {
    path: 'trending',
    loadChildren: () =>
      import('./product-discovery/presentation/product-discovery.routes').then(
        (m) => m.productDiscoveryRoutes,
      ),
  },
  { path: '**', redirectTo: 'dermatology' },
];
