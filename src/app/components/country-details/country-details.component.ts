import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-details',
  imports: [CommonModule],
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css'] 
})

export class CountryDetailsComponent implements OnInit {
  country: Country | null = null;
  borderCountries: { name: string, code: string }[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private countryService: CountryService
  ) {}

ngOnInit() {
  this.activeRoute.paramMap.subscribe(p => {
    const code = p.get('code');
    if (code) {
      this.countryService.getCountryByCode(code).subscribe(
        country => {
          this.country = country;
          if (country.borders && country.borders.length) {
            this.countryService.getCountriesByCodes(country.borders).subscribe(borders => {
              this.borderCountries = borders;
            });
          } else {
            this.borderCountries = [];
          }
        },
        error => {
          console.error('Error loading country:', error);
          this.router.navigate(['/']);
        }
      );
    }
  });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  goToCountry(code: string) {
    this.router.navigate(['/country', code]);
  }
} 