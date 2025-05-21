import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { RawCountry } from '../interfaces/rowCountry.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  
  getAllCountries(): Observable<Country[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`).pipe(
      map(data => data.map(country => ({
        name: country.name.common,
        population: country.population,
        region: country.region,
        capital: country.capital?.[0] || 'N/A',
        flag: country.flags?.svg || country.flags?.png,
        alpha3Code: country.cca3,
        borders: country.borders || []
      })))
    );
  }

  getCountryByCode(code: string): Observable<Country> {
    return this.http.get<RawCountry[]>(`${this.apiUrl}/alpha/${code}`).pipe(
      map(data => {
        const country = data[0];
        return {
          name: country.name.common,
          population: country.population,
          region: country.region,
          capital: country.capital?.[0] || 'N/A',
          flag: country.flags?.svg || country.flags?.png,
          alpha3Code: country.cca3,
          borders: country.borders || []
        };
      })
    );
  }

  searchCountries(countries: Country[], searchTerm: string): Country[] {
    return countries.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  filterByRegion(countries: Country[], region: string): Country[] {
    if (region === 'Filter by Region') return countries;
    return countries.filter(country =>
      country.region.toLowerCase() === region.toLowerCase()
    );
  }

  getCountriesByCodes(codes: string[]): Observable<{name: string, code: string}[]> {
    if (!codes.length) return new Observable(subscriber => subscriber.next([]));
    
    return this.http.get<RawCountry[]>(`${this.apiUrl}/alpha?codes=${codes.join(',')}`).pipe(
      map(data => data.map(country => ({
        name: country.name.common,
        code: country.cca3
      })))
    );
  }
} 