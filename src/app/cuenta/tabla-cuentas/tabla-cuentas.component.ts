import { Component , Input} from '@angular/core';
import { Account } from '../../model/Account';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CuentasService } from '../../service/cuentas.service'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CrearCuentaComponent } from '../crear-cuenta/crear-cuenta.component';

@Component({
  selector: 'app-tabla-cuentas',
  templateUrl: './tabla-cuentas.component.html',
  styleUrls: ['./tabla-cuentas.component.css']
})
export class TablaCuentasComponent {

  @Input() accounts !: MatTableDataSource<Account>;
  displayedColumns: string[] = ['id', 'type', 'balance', 'initialBalance', 'status','actions'];

  constructor(private router: Router,private cuentasService: CuentasService, private dialog: MatDialog, private snackBar: MatSnackBar) { }
  
  applyFilter(filterValue: string) {
    this.accounts.filter = filterValue.trim().toLowerCase();
  }

  showClient(id: number): void {
    this.router.navigate(['/cuentas', id]);
  }

  openCreateAccountDialog() {
    const dialogRef = this.dialog.open(CrearCuentaComponent);

    dialogRef.afterClosed().subscribe(newAccount => {
      if (newAccount) {
        console.log("new ", newAccount);
        const updatedData = [...this.accounts.data, newAccount];
        this.accounts = new MatTableDataSource(updatedData);
      }
    });
  }
  
  deleteClient(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Seguro quieres desactivar esta cuenta?',
      },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.cuentasService.deleteAccount(id).pipe(
          catchError(error => {
            console.log(error.error.error);
            if(error.error.error=="Client with id null has accounts"){
              this.snackBar.open("El cliente tiene cuentas activas", '', { duration: 2000 });
            }else{
              this.snackBar.open('Error al eliminar la cuenta', '', { duration: 2000 });
            }
            return of();
          })
        ).subscribe(() => {
          this.snackBar.open('Cuenta Desactivada Exitosamente', '', { duration: 2000 });
        });
      }
    });
  }
}
