import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../service/cliente.service'
import { Client } from 'src/app/model/Client';
import { MatTableDataSource } from '@angular/material/table';
import { Account } from '../../model/Account';

@Component({
  selector: 'app-detalles-cliente',
  templateUrl: './detalles-cliente.component.html',
  styleUrls: ['./detalles-cliente.component.css']
})
export class DetallesClienteComponent {

  client !: Client ;
  cuentas !: MatTableDataSource<Account>;

  constructor(private route: ActivatedRoute, private clientService: ClienteService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.clientService.getClient(id).subscribe(client => {
        this.client = client;
        this.cuentas = new MatTableDataSource(client.accounts);
        console.log(client);
      });
    }
  }

}
