import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/movies/api.service';

type Movies = {
  title: String;
  release_date: String;
  popularity: String;
  vote_average: String;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  total_pages!: number;
  pages: number[] = [1,2,3,4,5,6];
  activePage!: number;
  filteredMoviesList: Movies[] = [];
  moviesList: Movies[] = [];

  constructor(private apiService: ApiService) {
    this.activePage = 1;
  }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.apiService.getData().subscribe(data => {
      this.total_pages = data.total_pages;
      this.moviesList = data.results;
      this.filteredMoviesList = data.results;
    })
  }

  sendValueIntoService(value: number) {
    this.apiService.setPage(value);
    this.getData();
    this.activePage = value;

    if(value === this.pages[this.pages.length - 1] && this.pages[0] !== this.total_pages){
      this.pages.shift();
      this.pages.push(value + 1);
    } else if(value === this.pages[0] && this.pages[0] !== 1){
      this.pages.unshift(this.pages[0] - 1);
      this.pages.pop();
    }
  }

  filterResults(text: string) {
    this.filteredMoviesList = this.moviesList.filter(
      (movies: any) => movies.title.toLowerCase().includes(text.toLowerCase())
    );
  }
}
