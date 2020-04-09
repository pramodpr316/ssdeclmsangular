import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LmshttpService } from '../../common/lmshttp.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit, AfterViewInit {

  constructor(private httpService: LmshttpService) { }
  authors: any;

  ngOnInit() {
    this.loadAllAuthors();
  }

  ngAfterViewInit() {
    console.log('after view is loaded.')
  }

  loadAllAuthors() {
    this.httpService.getAll('http://localhost:8090/lms/readAuthors').subscribe(resp => {
      this.authors = resp;
      console.log(this.authors.length);
    })
  }

}
