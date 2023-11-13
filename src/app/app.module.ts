import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ClienteComponent } from './cliente/cliente.component';
import { HttpClientModule } from  '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DetallesClienteComponent } from './cliente/detalles-cliente/detalles-cliente.component';
import { MatCardModule } from '@angular/material/card';
import { CreateClientDialogComponent } from './cliente/create-client-dialog/create-client-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UpdateClientComponent } from './cliente/update-client/update-client.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { TablaCuentasComponent } from './cuenta/tabla-cuentas/tabla-cuentas.component';
import { DetallesCuentaComponent } from './cuenta/detalles-cuenta/detalles-cuenta.component';
import { CrearCuentaComponent } from './cuenta/crear-cuenta/crear-cuenta.component';
import { ActualizarCuentaComponent } from './cuenta/actualizar-cuenta/actualizar-cuenta.component';
import { MatSelectModule } from '@angular/material/select';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { TablaMovimientosComponent } from './movimientos/tabla-movimientos/tabla-movimientos.component';
import { DetallesMovimientosComponent } from './movimientos/detalles-movimientos/detalles-movimientos.component';
import { CrearMovimientoComponent } from './movimientos/crear-movimiento/crear-movimiento.component';
import { ActualizarMovimientoComponent } from './movimientos/actualizar-movimiento/actualizar-movimiento.component';
import { ReportesComponent } from './reportes/reportes.component';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    ConfirmDialogComponent,
    DetallesClienteComponent,
    CreateClientDialogComponent,
    UpdateClientComponent,
    CuentaComponent,
    TablaCuentasComponent,
    DetallesCuentaComponent,
    CrearCuentaComponent,
    ActualizarCuentaComponent,
    MovimientosComponent,
    TablaMovimientosComponent,
    DetallesMovimientosComponent,
    CrearMovimientoComponent,
    ActualizarMovimientoComponent,
    ReportesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule, 
    MatListModule,
    MatSidenavModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule ,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
