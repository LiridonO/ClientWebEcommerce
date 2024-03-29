import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path: 'home', component: HomeComponent, data:{breadcrumb:'Home'}},
  {path: 'shop',loadChildren: () =>  import('./shop/shop.module').then((mod) => mod.ShopModule),data: { breadcrumb: 'Shop' }},
  {path: 'basket',loadChildren: () =>  import('./basket/basket.module').then((mod) => mod.BasketModule),data: { breadcrumb: 'Basket' }},
  {path: 'checkout',canActivate:[AuthGuard], loadChildren: () =>  import('./checkout/checkout.module').then((mod) => mod.CheckoutModule),data: { breadcrumb: 'Checkout' }},
  {path: 'account',loadChildren: () =>  import('./account/account.module').then((mod) => mod.AccountModule),data: { breadcrumb: {skip:true} }},
  {path: '**', redirectTo: 'home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
