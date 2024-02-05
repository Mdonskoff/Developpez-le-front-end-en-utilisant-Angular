import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetailCountryComponent } from './pages/detail-country/detail-country.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

const routes: Routes = [
  {
    path: 'detail/:name',
    component: DetailCountryComponent,
  },
  {
    path: 'error',
    component: ErrorPageComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '**', // wildcard
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
