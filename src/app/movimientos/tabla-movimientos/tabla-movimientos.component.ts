import { Component , Input} from '@angular/core';
import { Transaction } from '../../model/Transaction';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MovimientosService } from '../../service/movimientos.service'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CrearMovimientoComponent } from '../../movimientos/crear-movimiento/crear-movimiento.component';


@Component({
  selector: 'app-tabla-movimientos',
  templateUrl: './tabla-movimientos.component.html',
  styleUrls: ['./tabla-movimientos.component.css']
})
export class TablaMovimientosComponent {
  
  @Input() transactions !: MatTableDataSource<Transaction>;
  displayedColumns: string[] = ['id','accountNumber' ,'creationDate', 'transactionType', 'value', 'balance','actions'];

  constructor(private router: Router,private movimientosService: MovimientosService, private dialog: MatDialog, private snackBar: MatSnackBar) { }
  
  applyFilter(filterValue: string) {
    this.transactions.filter = filterValue.trim().toLowerCase();
  }

  showMovimiento(id: number): void {
    this.router.navigate(['/movimientos', id]);
  }

  openCreateMovimientoDialog() {
    const dialogRef = this.dialog.open(CrearMovimientoComponent);

    dialogRef.afterClosed().subscribe(newMovement => {
      if (newMovement) {
        console.log("new ", newMovement);
        const updatedData = [...this.transactions.data, newMovement];
        this.transactions = new MatTableDataSource(updatedData);
      }
    });
  }
  
  deleteMovimiento(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Seguro quieres eliminar este movimiento?',
      },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.movimientosService.deleteTransaction(id).pipe(
          catchError(error => {
              this.snackBar.open('Error al eliminar la movimiento', '', { duration: 2000 });
            return of();
          })
        ).subscribe(() => {
          this.snackBar.open('Movimiento Eliminada Exitosamente', '', { duration: 2000 });
          this.transactions.data = this.transactions.data.filter(movimiento => movimiento.id !== id);
        });
      }
    });
  }
}
