import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovimientosService } from '../service/movimientos.service'
import { Transaction } from '../model/Transaction';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent {
  transaction !: MatTableDataSource<Transaction>;

  constructor(private router: Router,private movimientosService: MovimientosService) { }

  ngOnInit(): void {
    this.movimientosService.getTransactions().subscribe(data => {
      this.transaction = new MatTableDataSource(data);
    });
  }
}
