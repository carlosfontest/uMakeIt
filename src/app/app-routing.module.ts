// Modulos
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Todos los componentes para el routing
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { EditDishComponent } from './components/edit-dish/edit-dish.component';
import { AdminComponent } from './components/admin/admin.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CartComponent } from './components/orders/cart/cart.component';
import { PurchaseHistoryComponent } from './components/orders/purchase-history/purchase-history.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

// Guards para el routing
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

// Todas las rutas de la App
const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent},
  {path: 'edit-dish', component: EditDishComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [ AuthGuard, AdminGuard ]},
  {path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard]},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  {path: 'purchases', component: PurchaseHistoryComponent, canActivate: [AuthGuard]},
  {path: 'recover-password', component: RecoverPasswordComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [
  RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})
  ],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule { }
