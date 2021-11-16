import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './admin/admin-books/add-book/add-book.component';

import { AdminBooksComponent } from './admin/admin-books/admin-books.component';
import { EditBookComponent } from './admin/admin-books/edit-book/edit-book.component';
import { AddCategoryComponent } from './admin/admin-categories/add-category/add-category.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { EditCategoryComponent } from './admin/admin-categories/edit-category/edit-category.component';
import { AddCouponComponent } from './admin/admin-coupons/add-coupon/add-coupon.component';
import { AdminCouponsComponent } from './admin/admin-coupons/admin-coupons.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminPasswordComponent } from './admin/admin-password/admin-password.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { EditUserComponent } from './admin/admin-users/edit-user/edit-user.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { AddUserComponent } from './auth/components/add-user/add-user.component';
import { SigninComponent } from './auth/components/signin/signin.component';
import { BooksDetailsComponent } from './books/books-details/books-details.component';
import { BooksListingComponent } from './books/books-listing/books-listing.component';
import { FeaturedComponent } from './books/featured/featured.component';
import { NewComponent } from './books/new/new.component';
import { SearchComponent } from './books/search/search.component';
import { WishlistComponent } from './books/wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { CouponsComponent } from './coupons/coupons.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { MakeRatingComponent } from './make-rating/make-rating.component';
import { NewcartComponent } from './newcart/newcart.component';
import { OrderinvoiceComponent } from './orderinvoice/orderinvoice.component';
import { TestuserComponent } from './testuser/testuser.component';
import { UpdateuserprofileComponent } from './testuser/updateuserprofile/updateuserprofile.component';
import { UseraddressComponent } from './testuser/useraddress/useraddress.component';
import { UserpasswordComponent } from './testuser/userpassword/userpassword.component';
import { UserprofileComponent } from './testuser/userprofile/userprofile.component';
import { ViewordersComponent } from './testuser/vieworders/vieworders.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, 
  { path: '', component: HomeComponent }, 
  { path: 'books', component: BooksListingComponent },
  { path: 'books/:id', component: BooksDetailsComponent },
  { path: 'cart', component: NewcartComponent, canActivate:[AuthGuard] },
  { path: 'admin', component:DashboardComponent, canActivate:[AuthGuard] , data:{roles:['Admin']}},
  { path: 'admin-dashboard', component:DashboardComponent, canActivate:[AuthGuard] , data:{roles:['Admin']} },
  { path: 'admin-orders', component:AdminOrdersComponent, canActivate:[AuthGuard] , data:{roles:['Admin']} },
  { path: 'admin-books', component: AdminBooksComponent, canActivate:[AuthGuard] , data:{roles:['Admin']}},
  { path: 'admin-books/add', component: AddBookComponent, canActivate:[AuthGuard] , data:{roles:['Admin']}},
  { path: 'admin-books/:id', component: EditBookComponent, canActivate:[AuthGuard] , data:{roles:['Admin']}},
  { path: 'admin-users', component:AdminUsersComponent, canActivate:[AuthGuard] , data:{roles:['Admin']} },
  { path: 'admin-users/:id', component: EditUserComponent, canActivate:[AuthGuard] , data:{roles:['Admin']}},
  { path: 'admin-categories', component:AdminCategoriesComponent, canActivate:[AuthGuard] , data:{roles:['Admin']} },
  { path: 'admin-categories/add', component:AddCategoryComponent, canActivate:[AuthGuard] , data:{roles:['Admin']} },
  { path: 'admin-categories/:id', component:EditCategoryComponent, canActivate:[AuthGuard] , data:{roles:['Admin']} },
  { path: 'admin-coupons', component:AdminCouponsComponent, canActivate:[AuthGuard] , data:{roles:['Admin']} },
  { path: 'admin-coupons/add', component:AddCouponComponent, canActivate:[AuthGuard] , data:{roles:['Admin']} },
  { path: 'admin-password', component:AdminPasswordComponent, canActivate:[AuthGuard] , data:{roles:['Admin']} },
  { path: 'featured', component:FeaturedComponent },
  { path: 'new', component:NewComponent },
  { path: 'coupons', component:CouponsComponent },
  { path: 'search', component:SearchComponent },
  { path: 'signup', component: AddUserComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'forbidden', component: ForbiddenComponent},//, canActivate:[AuthGuard] },
  { path: 'users', component: UserprofileComponent , canActivate:[AuthGuard] },
  // { path: 'adminpanel', component: AdminPanelComponent , canActivate:[AuthGuard] , data:{roles:['Admin']} },
  { path: 'profile', component:UserprofileComponent }, //update to user after integration 
  { path: 'profile/update', component:UpdateuserprofileComponent }, //update to user after integration 
  { path: 'address', component:UseraddressComponent }, //update to user after integration 
  { path: 'orders', component:ViewordersComponent }, //update to user after integration 
  { path: 'change-password', component:UserpasswordComponent }, //update to user after integration 
  { path: 'book-details', component:BooksDetailsComponent },
  { path: 'order-invoice', component:OrderinvoiceComponent },
  { path: 'ncart', component:NewcartComponent },
  { path: 'rating', component:MakeRatingComponent },
  { path: 'wishlist', component:WishlistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
