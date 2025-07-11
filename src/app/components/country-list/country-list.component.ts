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
  currentPage = 1;
  itemsPerPage = 12;
  paginatedCountries: Country[] = [];

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.getAll();
  }
  getAll() {
    this.countryService.getAllCountries().subscribe((countries) => {
      this.countries = countries;
      this.filteredCountries = countries;
      this.setPaginatedCountries();
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
    this.currentPage = 1;
    this.setPaginatedCountries();
  }

  setPaginatedCountries() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedCountries = this.filteredCountries.slice(start, end);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.setPaginatedCountries();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCountries.length / this.itemsPerPage);
  }

  get displayedPages(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const maxPages = 3;
    let start = Math.max(1, current - 1);
    let end = Math.min(total, start + maxPages - 1);
    if (end - start < maxPages - 1) {
      start = Math.max(1, end - maxPages + 1);
    }
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
}
