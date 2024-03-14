import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``,
})
export class ByCountryPageComponent implements OnInit {
  public countries: Country[] = [];
  public initialValue: string = '';
  public isLoading: boolean = false;

  constructor(private countriesServices: CountriesService) {}
  ngOnInit(): void {
    this.countries = this.countriesServices.cacheStore.byCountries.countries;
    this.initialValue = this.countriesServices.cacheStore.byCountries.term;
  }

  searchByCountry(term: string) {
    this.isLoading = true;
    this.countriesServices.searchCountry(term).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
