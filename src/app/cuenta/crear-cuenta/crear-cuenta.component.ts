import { Component} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../../service/cliente.service';
import { CuentasService } from '../../service/cuentas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from '../../model/Client';
import { Account } from '../../model/Account';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent {

  clients !: Client[];

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private cuentasService: CuentasService,
    public dialogRef: MatDialogRef<CrearCuentaComponent, Account>,
    private snackBar: MatSnackBar
  ) { }

  createForm = this.fb.group({
    clientId: ['', Validators.required],
    accountType: ['', Validators.required],
    initialBalance: [0, Validators.required]
  });

  createClient() {
    this.cuentasService.createAccount(new Account(this.createForm.value)).pipe(
      catchError(error => {
        console.log(error);
        this.snackBar.open('Error al crear la Cuenta', '', { duration: 2000 });
        return of();
      })
    ).subscribe((newClient: Account) => {
      this.snackBar.open('Cuenta creada Exitosamente', '', { duration: 2000 });
      this.dialogRef.close(newClient);
    });
  }

  ngOnInit() {
    this.clienteService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  close() {
    this.dialogRef.close();
  }
}
