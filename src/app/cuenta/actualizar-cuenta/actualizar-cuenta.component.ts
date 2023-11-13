import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CuentasService } from '../../service/cuentas.service';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../model/Client';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Account } from 'src/app/model/Account';


@Component({
  selector: 'app-actualizar-cuenta',
  templateUrl: './actualizar-cuenta.component.html',
  styleUrls: ['./actualizar-cuenta.component.css']
})
export class ActualizarCuentaComponent {

  updateForm !: FormGroup;
  account !: Account;

  constructor( private location: Location, private formBuilder: FormBuilder, private cuentaService: CuentasService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit() {
    const AccountNumber = Number(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(AccountNumber)) {
      this.cuentaService.getAccount(AccountNumber).subscribe(account => {
        if (account) {
          this.account = account;
          this.updateForm.patchValue(account);
        }
      });
    }

    this.updateForm = this.formBuilder.group({
      status: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.updateForm.valid) {
      const clientData = { ...this.updateForm.value, accountNumber: Number(this.route.snapshot.paramMap.get('id')) };
  
      this.cuentaService.updateAccount(new Account(clientData)).pipe(
        catchError(error => {
          console.log(error);
          this.snackBar.open('Ocurrió un error mientras se actualizaba el cliente', 'Close', {
            duration: 2000,
          });
          return of();
        })
      ).subscribe(() => {
        this.snackBar.open('Client updated successfully', 'Close', {
          duration: 2000,
        });
      });
    }
  }

  goBack() {
    this.location.back();
  }

}
