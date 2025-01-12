import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchValue: string = '';
  onSearch = (event: any) => {
    this.searchValue = event.target.value as string;
  };
}
