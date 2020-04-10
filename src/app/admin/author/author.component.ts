import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LmshttpService } from '../../common/lmshttp.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PagerService } from '../../common/pager.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit, AfterViewInit {

  constructor(private httpService: LmshttpService, private modalService: NgbModal, private pagerService: PagerService) { }
  authors: any;
  selectedAuthor: any;
  private modalRef: NgbModalRef;
  errMsg: any;
  closeResult: any;
  totalAuthors = 0;
  today = new Date();
  pager: any = {};
  pagedItems: any[];
  searchString = '';
  ngOnInit() {
    this.loadAllAuthors();
  }

  ngAfterViewInit() {
    console.log('after view is loaded.')
  }

  loadAllAuthors() {
    this.httpService.getAll('http://localhost:8090/lms/readAuthors').subscribe(resp => {
      this.authors = resp;
      this.totalAuthors = this.authors.length;
      this.setPage(1);
    })
  }

  deleteAuthor(a){
    let author = {
      authorId: a.authorId
    }
    this.httpService.postObj('http://localhost:8090/lms/updateAuthor', author).subscribe(resp => {
      this.loadAllAuthors();
    })
  }

  updateAuthor(){
    this.httpService.postObj('http://localhost:8090/lms/updateAuthor', this.selectedAuthor).subscribe(resp => {
      this.loadAllAuthors();
      this.modalService.dismissAll();
    })
  }

  open(content, obj) {
    this.selectedAuthor = obj;
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then(
      result => {
        this.errMsg = '';
        this.closeResult = `Closed with ${result}`;
      },
      reason => {
        this.errMsg = '';
        this.closeResult = `Dismissed`
      }
    )
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.authors.length, page, 10);
    this.pagedItems = this.authors.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1,
    );
  }

  searchAuthors(){
    this.httpService.getAll(`http://localhost:8090/lms/readAuthorsByName/${this.searchString}`).subscribe(resp => {
      this.authors = resp;
      this.totalAuthors = this.authors.length;
      this.setPage(1);
    })
  }
}
