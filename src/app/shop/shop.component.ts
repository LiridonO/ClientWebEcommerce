import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { IBrand } from '../shared/models/brand';
import { IProductType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {

  @ViewChild('search', {static:false}) searchTerm: ElementRef;
  sortValue = new FormControl('');
  products: IProduct[];
  brands: IBrand[];
  types: IProductType[];
  shopParams = new ShopParams();
  totalCount: number;

  sortOptions = [
    {name: 'Alphabetical',value : 'name'},
    {name: 'Price: Low to High',value : 'priceAsc'},
    {name: 'Price: High to Low',value : 'priceDesc'}
  ];

  constructor(private shopService : ShopService){}

  ngOnInit() {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(){
    console.log(this.shopParams);

    this.shopService.getProducts(this.shopParams).subscribe(response => {
      this.products = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }

  getBrands(){
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{id: 0,name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  getTypes(){
    this.shopService.getProductTypes().subscribe(response => {
      this.types = [{id: 0,name: 'All'}, ...response];
    }, error => {
      console.log(error);
    })
  }

  onBrandSelected(brandId: number){
    console.log(brandId);

    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number){
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string){
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event:any){
    if(this.shopParams.pageNumber !== event){
      this.shopParams.pageNumber = event;
    this.getProducts();
    }
  }

  onSearch(){
    console.log(this.searchTerm);

    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset(){
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }

}
