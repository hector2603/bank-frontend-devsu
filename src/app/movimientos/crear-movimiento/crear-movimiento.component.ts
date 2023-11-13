import { Component} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { MovimientosService } from '../../service/movimientos.service';
import { CuentasService } from '../../service/cuentas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Account } from '../../model/Account';
import { Transaction } from '../../model/Transaction';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-crear-movimiento',
  templateUrl: './crear-movimiento.component.html',
  styleUrls: ['./crear-movimiento.component.css']
})
export class CrearMovimientoComponent {
  accounts !: Account[];

  constructor(
    private fb: FormBuilder,
    private movimientoService: MovimientosService,
    private cuentasService: CuentasService,
    public dialogRef: MatDialogRef<CrearMovimientoComponent, Transaction>,
    private snackBar: MatSnackBar
  ) { }

  createForm = this.fb.group({
    accountNumber: ['', Validators.required],
    transactionType: ['', Validators.required],
    value: [0, Validators.required]
  });

  createMovimiento() {
    this.movimientoService.createTransaction(new Transaction(this.createForm.value)).pipe(
      catchError(error => {
        console.log(error);
        this.snackBar.open('Error al crear el Movimiento', '', { duration: 2000 });
        return of();
      })
    ).subscribe((newTransaction: Transaction) => {
      this.snackBar.open('Movimiento creado Exitosamente', '', { duration: 2000 });
      this.dialogRef.close(newTransaction);
    });
  }

  ngOnInit() {
    this.cuentasService.getAccounts().subscribe(accounts => {
      this.accounts = accounts;
    });
  }

  close() {
    this.dialogRef.close();
  }
}
