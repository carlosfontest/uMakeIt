// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { BsDropdownModule, PopoverModule, AccordionModule } from 'ngx-bootstrap';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

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
import { CartComponent } from './components/cart/cart.component';
import { PurchaseHistoryComponent } from './components/purchase-history/purchase-history.component';
import { AdminComponent } from './components/admin/admin.component';
import { EditDishComponent } from './components/edit-dish/edit-dish.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PurchaseCardComponent } from './components/purchase-history/purchase-card/purchase-card.component';
import { RecoverPasswordModalComponent } from './components/shared/modals/recover-password-modal/recover-password-modal.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { SideDishCardComponent } from './components/edit-dish/side-dish-card/side-dish-card.component';
import { StatsSectionComponent } from './components/admin/stats-section/stats-section.component';
import { StickyDishViewComponent } from './components/edit-dish/sticky-dish-view/sticky-dish-view.component';
import { AdminSectionComponent } from './components/admin/admin-section/admin-section.component';
import { PendingOrdersAccordionComponent } from './components/admin/admin-section/pending-orders-accordion/pending-orders-accordion.component';
import { EditProductsAccordionComponent } from './components/admin/admin-section/edit-products-accordion/edit-products-accordion.component';
import { AddProductsAccordionComponent } from './components/admin/admin-section/add-products-accordion/add-products-accordion.component';
import { EditSideDishComponent } from './components/admin/admin-section/edit-products-accordion/edit-side-dish/edit-side-dish.component';
import { AddEditableProductComponent } from './components/admin/admin-section/add-products-accordion/add-editable-product/add-editable-product.component';
import { AddNonEditableProductComponent } from './components/admin/admin-section/add-products-accordion/add-non-editable-product/add-non-editable-product.component';
import { AddSideDishComponent } from './components/admin/admin-section/add-products-accordion/add-side-dish/add-side-dish.component';
import { EditProductComponent } from './components/admin/admin-section/edit-products-accordion/edit-product/edit-product.component';
import { BillModalComponent } from './components/shared/modals/bill-modal/bill-modal.component';

// Services
import { AuthService } from './services/auth.service';
import { DishService } from './services/dish.service';
import { UserService } from './services/user.service';
import { SideDishService } from './services/side-dish.service';
import { StorageService } from './services/storage.service';

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
    AddEditableProductComponent,
    EditDishComponent,
    PendingOrdersAccordionComponent,
    RecoverPasswordModalComponent,
    RecoverPasswordComponent,
    PurchaseCardComponent,
    AddNonEditableProductComponent,
    AddSideDishComponent,
    EditProductsAccordionComponent,
    AddProductsAccordionComponent,
    EditSideDishComponent,
    EditProductComponent,
    BillModalComponent
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
    PasswordStrengthBarModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    SnotifyModule
  ],
  providers: [
    AuthService,
    DishService,
    UserService,
    SideDishService,
    StorageService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    RecoverPasswordModalComponent,
    BillModalComponent
  ]
})
export class AppModule { }
