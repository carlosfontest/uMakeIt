// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
// import { FlashMessagesModule } from 'angular2-flash-messages';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { BsDropdownModule, PopoverModule, AccordionModule } from 'ngx-bootstrap';

// Firebase and Firestore
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

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
import { AdminComponent } from './components/admin/admin.component';
import { EditDishComponent } from './components/edit-dish/edit-dish.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './components/not-found/not-found.component';

// Services
import { AuthService } from './services/auth.service';
import { DishService } from './services/dish.service';
import { UserService } from './services/user.service';
import { SideDishCardComponent } from './components/edit-dish/side-dish-card/side-dish-card.component';
import { StatsSectionComponent } from './components/admin/stats-section/stats-section.component';
import { StickyDishViewComponent } from './components/edit-dish/sticky-dish-view/sticky-dish-view.component';
import { AdminSectionComponent } from './components/admin/admin-section/admin-section.component';
import { AddProductAccordionComponent } from './components/admin/admin-section/add-product-accordion/add-product-accordion.component';
import { EditProductAccordionComponent } from './components/admin/admin-section/edit-product-accordion/edit-product-accordion.component';
import { PendingOrdersAccordionComponent } from './components/admin/admin-section/pending-orders-accordion/pending-orders-accordion.component';
import { SideDishService } from './services/side-dish.service';

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
    AdminComponent,
    EditDishComponent,
    NotFoundComponent,
    SideDishCardComponent,
    StatsSectionComponent,
    StickyDishViewComponent,
    AdminSectionComponent,
    AddProductAccordionComponent,
    EditProductAccordionComponent,
    PendingOrdersAccordionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    PopoverModule.forRoot(),
    AccordionModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'umakeit-crr'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FlashMessagesModule.forRoot(),
    PasswordStrengthBarModule
  ],
  providers: [
    AuthService,
    DishService,
    UserService,
    SideDishService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
