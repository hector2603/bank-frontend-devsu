import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MovimientosService } from '../../service/movimientos.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Account } from 'src/app/model/Account';
import { Transaction } from 'src/app/model/Transaction';
import { CuentasService } from '../../service/cuentas.service';

@Component({
  selector: 'app-actualizar-movimiento',
  templateUrl: './actualizar-movimiento.component.html',
  styleUrls: ['./actualizar-movimiento.component.css']
})
export class ActualizarMovimientoComponent {
  updateForm !: FormGroup;
  transaction !: Transaction;
  accounts !: Account[];

  constructor( private location: Location, private formBuilder: FormBuilder, private cuentasService: CuentasService , private movimientosService: MovimientosService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit() {
    const AccountNumber = Number(this.route.snapshot.paramMap.get('id'));

    this.updateForm = this.formBuilder.group({
      accountNumber: ['', Validators.required],
      transactionType: ['', Validators.required],
      value: [0, Validators.required]
    });

    if (!isNaN(AccountNumber)) {
      this.movimientosService.getTransaction(AccountNumber).subscribe(movimiento => {
        if (movimiento) {
          this.transaction = movimiento;
          movimiento.transactionType = movimiento.transactionType === 'Retiro' ? 'WITHDRAWAL'  : 'DEPOSIT';
          this.updateForm.patchValue(movimiento);
        }
      });
    }

    this.cuentasService.getAccounts().subscribe(accounts => {
      this.accounts = accounts;
    });
  }

  onSubmit() {
    if (this.updateForm.valid) {
      const transactionData = { ...this.updateForm.value, id: Number(this.route.snapshot.paramMap.get('id')) };
  
      this.movimientosService.updateTransaction(new Transaction(transactionData)).pipe(
        catchError(error => {
          console.log(error);
          this.snackBar.open('Ocurrió un error mientras se actualizaba la transacción', 'Close', {
            duration: 2000,
          });
          return of();
        })
      ).subscribe(() => {
        this.snackBar.open('Movimiento Actualizado Correctamente', 'Close', {
          duration: 2000,
        });
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
