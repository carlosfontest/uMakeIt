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
import { NotFoundComponent } from './components/not-found/not-found.component';

// Todas las rutas de la App
const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'home', component: HomeComponent},
  {path: 'edit-dish/:id', component: EditDishComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path: 'cart', component: CartComponent},
  {path: 'purchases', component: PurchaseHistoryComponent},
  {path: '**', component: NotFoundComponent}

];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [ ]
})
export class AppRoutingModule { }
