// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule, PopoverModule } from 'ngx-bootstrap';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DishCardComponent } from './components/dashboard/dish-card/dish-card.component';
import { LoginComponent } from './components/home/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/home/register/register.component';
import { TitleBannerComponent } from './components/shared/title-banner/title-banner.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CartComponent } from './components/orders/cart/cart.component';
import { PurchaseHistoryComponent } from './components/orders/purchase-history/purchase-history.component';
import { EditDishComponent } from './components/edit-dish/edit-dish.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    DashboardComponent,
    DishCardComponent,
    TitleBannerComponent,
    ChangePasswordComponent,
    CartComponent,
    PurchaseHistoryComponent,
    EditDishComponent,
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    PopoverModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
