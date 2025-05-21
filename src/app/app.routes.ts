import { Routes } from '@angular/router';
import { CountryDetailsComponent } from './components/country-details/country-details.component';
import { CountryListComponent } from './components/country-list/country-list.component';

export const routes: Routes = [
  { path: 'country/:code', component: CountryDetailsComponent },
  { path: '', component: CountryListComponent },
  { path: '**', redirectTo: '' }
];
