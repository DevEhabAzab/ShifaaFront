import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data/data.service';
import { blogs } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  public routes = routes;
  public blogs: Array<blogs> = [];
  public pagedBlogs: Array<blogs> = [];
  public pageSize: number = 2;
  public currentPage: number = 0;

  constructor(public data: DataService) {}

  ngOnInit(): void {
    this.blogs = this.data.blogs;
    this.setPagedBlogs();
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.setPagedBlogs();
  }

  setPagedBlogs(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedBlogs = this.blogs.slice(startIndex, endIndex);
  }
}
