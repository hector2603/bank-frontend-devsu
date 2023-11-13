import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuentasService } from '../../service/cuentas.service'
import { Transaction } from '../../model/Transaction';
import { MatTableDataSource } from '@angular/material/table';
import { Account } from '../../model/Account';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalles-cuenta',
  templateUrl: './detalles-cuenta.component.html',
  styleUrls: ['./detalles-cuenta.component.css']
})
export class DetallesCuentaComponent {
  account !: Account ;
  trasactions !: MatTableDataSource<Transaction>;

  constructor(private router: Router,private route: ActivatedRoute, private cuentaService: CuentasService) { }

  showClient(id: number): void {
    this.router.navigate(['/client', id]);
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.cuentaService.getAccount(id).subscribe(account => {
        this.account = account;
        this.trasactions = new MatTableDataSource(account.transactions);
        console.log(account);
      });
    }
  }
}
