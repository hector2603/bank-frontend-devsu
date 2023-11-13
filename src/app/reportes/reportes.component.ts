import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ReportesService } from '../service/reportes.service';
import { Client } from '../model/Client';
import { ClienteService } from '../service/cliente.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {

  form !: FormGroup;
  response: any;
  clients !: Client[];

  constructor(private fb: FormBuilder,
    private clienteService: ClienteService,
    private reportesService: ReportesService, 
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.form = this.fb.group({
      clientId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reportType: ['', Validators.required]
    });
    this.clienteService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  submit() {
    const params = this.form.value;
    params.startDate = this.datePipe.transform(params.startDate, 'yyyy-MM-dd');
    params.endDate = this.datePipe.transform(params.endDate, 'yyyy-MM-dd');
  
    if (params.reportType === 'PDF') {
      this.reportesService.getReportPdf(params);
    } else {
      this.reportesService.getReportJson(params).subscribe(response => {
        this.response = response;
      });
    }
  }

}
