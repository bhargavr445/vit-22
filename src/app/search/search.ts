import { httpResource, HttpResourceRef } from '@angular/common/http';
import { Component, debounced, Resource, signal } from '@angular/core';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {

  searchText = signal('bhargav');
  debouncedSearchText: Resource<string> = debounced(this.searchText, 2000);

  searchResultsResource: HttpResourceRef<any> = httpResource<any>(() => ({
    url: this.debouncedSearchText.value() ? `https://dummyjson.com/products/search?q=${this.debouncedSearchText.value()}&limit=10` : undefined,
  }))

  testValue() {
    console.log(this.searchText());
  }

}
