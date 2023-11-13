import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovimientosService } from '../../service/movimientos.service';
import { Transaction } from '../../model/Transaction';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalles-movimientos',
  templateUrl: './detalles-movimientos.component.html',
  styleUrls: ['./detalles-movimientos.component.css']
})
export class DetallesMovimientosComponent {
  transaction !: Transaction ;

  constructor(private router: Router,private route: ActivatedRoute, private movimientosService: MovimientosService) { }

  showAccount(id: number): void {
    this.router.navigate(['/cuentas', id]);
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.movimientosService.getTransaction(id).subscribe(transaction => {
        this.transaction = transaction;
        console.log(transaction);
      });
    }
  }
}
