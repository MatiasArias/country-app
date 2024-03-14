import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: ``,
})
export class CountryPageComponent implements OnInit {
  public country?: Country;

  constructor(
    private activateRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        switchMap(({ id }) =>
          this.countriesService.searchCountryByAplhaCode(id)
        )
      )
      .subscribe((country) => {
        if (!country) {
          return this.router.navigateByUrl('');
        }
        return (this.country = country);
      });
  }
  searchCountry(code: string) {
    this.countriesService
      .searchCountryByAplhaCode(code)
      .subscribe((country) => {
        console.log({ country });
      });
  }
}
