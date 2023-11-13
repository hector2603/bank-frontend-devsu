import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { DetallesClienteComponent } from './cliente/detalles-cliente/detalles-cliente.component';
import { UpdateClientComponent } from './cliente/update-client/update-client.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { DetallesCuentaComponent } from './cuenta/detalles-cuenta/detalles-cuenta.component';
import { ActualizarCuentaComponent } from './cuenta/actualizar-cuenta/actualizar-cuenta.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { DetallesMovimientosComponent } from './movimientos/detalles-movimientos/detalles-movimientos.component';
import { ActualizarMovimientoComponent } from './movimientos/actualizar-movimiento/actualizar-movimiento.component';
import { ReportesComponent } from './reportes/reportes.component';
const routes: Routes = [
  { path: 'clientes', component: ClienteComponent },
  { path: 'client/:id', component: DetallesClienteComponent },
  { path: '', redirectTo: '/clientes', pathMatch: 'full'},
  { path: 'client/update/:id', component: UpdateClientComponent },
  { path: 'cuentas', component: CuentaComponent},
  { path: 'cuentas/:id', component: DetallesCuentaComponent},
  { path: 'cuentas/update/:id', component: ActualizarCuentaComponent},
  { path: 'movimientos', component: MovimientosComponent},
  { path: 'movimientos/:id', component: DetallesMovimientosComponent},
  { path: 'movimientos/update/:id', component: ActualizarMovimientoComponent},
  { path: 'reportes', component: ReportesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
