import { Component, OnInit } from '@angular/core';
import { ContractsService } from '../../services/contracts.service';
import { Contracts } from '../../models/contract';

@Component({
  selector: 'app-contracts-d',
  templateUrl: './contracts-d.component.html',
  styleUrls: ['./contracts-d.component.css'],
})
export class ContractsDComponent implements OnInit {
  public contracts: any = [];

  constructor(private contractsService: ContractsService) {}

  ngOnInit(): void {
    this.contractsService.uploadContracts().subscribe((response) => {
      console.log(response);
      this.contracts = response;
    });
  }
}
