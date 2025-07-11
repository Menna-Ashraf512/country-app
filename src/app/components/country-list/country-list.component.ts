import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CountryCardComponent } from '../country-card/country-card.component';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { get } from 'node:http';

@Component({
  selector: 'app-country-list',
  imports: [CommonModule, FormsModule, RouterModule, CountryCardComponent],
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
})
export class CountryListComponent implements OnInit {
  countries: Country[] = [];
  filteredCountries: Country[] = [];
  searchTerm = '';
  selectedRegion = 'Filter by Region';

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.getAll();
  }
  getAll() {
    this.countryService.getAllCountries().subscribe((countries) => {
      this.countries = countries;
      this.filteredCountries = countries;
    });
  }
  onSearch() {
    this.filterCountries();
  }

  onRegionChange() {
    this.filterCountries();
  }

  private filterCountries() {
    let filtered = this.countries;

    if (this.searchTerm) {
      filtered = this.countryService.searchCountries(filtered, this.searchTerm);
    }

    if (this.selectedRegion !== 'Filter by Region') {
      filtered = this.countryService.filterByRegion(
        filtered,
        this.selectedRegion
      );
    }

    this.filteredCountries = filtered;
  }
}
