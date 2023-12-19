import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './components/pagingheader/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import {CarouselModule} from 'ngx-bootstrap/carousel';


@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot()
  ],
  exports: [
    MatIconModule,
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    CarouselModule
  ]
})
export class SharedModule { }
