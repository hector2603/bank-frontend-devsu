import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../service/cliente.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateClientDialogComponent } from './create-client-dialog/create-client-dialog.component';
import { Client } from '../model/Client';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clients !: MatTableDataSource<Client>;
  displayedColumns: string[] = ['id', 'name', 'gender', 'age', 'identification','address',"phone","status",'actions'];

  constructor(private router: Router,private clientService: ClienteService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  showClient(id: number): void {
    this.router.navigate(['/client', id]);
  }

  openCreateClientDialog() {
    const dialogRef = this.dialog.open(CreateClientDialogComponent);

    dialogRef.afterClosed().subscribe(newClient => {
      if (newClient) {
        console.log("new ", newClient);
        const updatedData = [...this.clients.data, newClient];
        this.clients = new MatTableDataSource(updatedData);
      }
    });
  }
  
  deleteClient(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Seguro quieres eliminar este cliente?',
      },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.clientService.deleteClient(id).pipe(
          catchError(error => {
            console.log(error.error.error);
            if(error.error.error=="Client with id null has accounts"){
              this.snackBar.open("El cliente tiene cuentas activas", '', { duration: 2000 });
            }else{
              this.snackBar.open('Error al eliminar el cliente', '', { duration: 2000 });
            }
            return of();
          })
        ).subscribe(() => {
          this.snackBar.open('Cliente Eliminado Exitosamente', '', { duration: 2000 });
          this.clients.data = this.clients.data.filter(client => client.id !== id);
        });
      }
    });
  }

  applyFilter(filterValue: string) {
    this.clients.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(data => {
      this.clients = new MatTableDataSource(data);
    });
  }
}