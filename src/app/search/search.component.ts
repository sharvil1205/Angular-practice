import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchValue: string = 'initial text';
  onInputChange = (event: any) => {
    this.searchValue = event?.target.value;
  };
  onSearch = () => {
    this.displayedText = this.searchValue;
  };
  displayedText: string = '';
}
