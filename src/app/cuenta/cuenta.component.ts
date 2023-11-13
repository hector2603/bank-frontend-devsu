import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CuentasService } from '../service/cuentas.service'
import { Account } from '../model/Account';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent {

  cuentas !: MatTableDataSource<Account>;

  constructor(private router: Router,private cuentaService: CuentasService) { }

  ngOnInit(): void {
    this.cuentaService.getAccounts().subscribe(data => {
      this.cuentas = new MatTableDataSource(data);
    });
  }
}
