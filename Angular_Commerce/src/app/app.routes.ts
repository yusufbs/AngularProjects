import { Routes } from '@angular/router';
import { Home } from './home/home';
import { UserProfile } from './user-profile/user-profile';
import { ContactUs } from './contact-us/contact-us';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'profile', component: UserProfile },
  { path: 'contact', component: ContactUs },

  // //Path/component you want to access before admin login/signin
  // {
  //   path: '',
  //   canActivate: [AdminAuthGuardLogin],
  //   children: [{ path: 'admin-login', component: AdminLoginComponent }],
  // },
  // //Path/component you want to access after admin login/signin
  // {
  //   path: '',
  //   canActivate: [AdminAuthGaurdService],
  //   children: [
  //     { path: 'admin-dashboard', component: AdminDashboardComponent },
  //     { path: 'admin/user', component: UserCrudComponent },
  //     { path: 'admin/product', component: ProductCrudComponent },
  //   ],
  // },

  // //Path/component you want to access before customer(seller and buyer) login/signin
  // {
  //   path: '',
  //   canActivate: [SellerBuyerAuthGuardLogin],
  //   children: [
  //     { path: 'sign-in', component: SigninSignupComponent },
  //     { path: 'sign-up', component: SigninSignupComponent },
  //   ],
  // },

  // //Path/component you want to access after customer(seller) login/signin
  // {
  //   path: '',
  //   canActivate: [SellerAuthGaurdService],
  //   children: [
  //     { path: 'seller-dashboard', component: SellerDashboardComponent },
  //     { path: 'seller/product', component: ProductCrudComponent },
  //   ],
  // },

  // //Path/component you want to access after customer(buyer) login/signin
  // {
  //   path: '',
  //   canActivate: [BuyerAuthGaurdService],
  //   children: [
  //     { path: 'buyer-dashboard', component: BuyerDashboardComponent },
  //     { path: 'checkout', component: CheckoutComponent },
  //   ],
  // },
  // { path: '**', component: PageNotFoundErrorComponent },
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes, { useHash: true })],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}
