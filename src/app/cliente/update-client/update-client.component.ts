import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../../service/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../model/Client';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent {
  updateForm !: FormGroup;

  constructor( private location: Location, private formBuilder: FormBuilder, private clienteService: ClienteService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit() {
    const clientId = Number(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(clientId)) {
      this.clienteService.getClient(clientId).subscribe(client => {
        if (client) {
          this.updateForm.patchValue(client);
        }
      });
    }

    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      age: [0, Validators.required],
      identification: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      status: ['', Validators.required],
      password: ['']
    });
  }

  onSubmit() {
    if (this.updateForm.valid) {
      const clientData = { ...this.updateForm.value, id: Number(this.route.snapshot.paramMap.get('id')) };
  
      this.clienteService.updateClient(new Client(clientData)).pipe(
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
