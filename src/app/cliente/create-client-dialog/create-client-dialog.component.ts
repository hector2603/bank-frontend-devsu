import { Component} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../../service/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from '../../model/Client';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-create-client-dialog',
  templateUrl: './create-client-dialog.component.html',
  styleUrls: ['./create-client-dialog.component.css']
})
export class CreateClientDialogComponent {

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    public dialogRef: MatDialogRef<CreateClientDialogComponent, Client>,
    private snackBar: MatSnackBar
  ) { }

  createForm = this.fb.group({
    name: ['', Validators.required],
    gender: ['', Validators.required],
    age: [0, Validators.required],
    identification: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    password: ['', Validators.required]
  });

  createClient() {
    console.log(this.createForm.value);
    this.clienteService.createClient(new Client(this.createForm.value)).pipe(
      catchError(error => {
        console.log(error);
        this.snackBar.open('Error al crear el cliente', '', { duration: 2000 });
        return of();
      })
    ).subscribe((newClient: Client) => {
      this.snackBar.open('Cliente Creado Exitosamente', '', { duration: 2000 });
      this.dialogRef.close(newClient);
    });
  }

  close() {
    this.dialogRef.close();
  }
}
