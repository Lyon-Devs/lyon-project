import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Contract } from '@models/contract.model';
import { ContractService } from '@services/contract/contract.service';


@Injectable({
  providedIn: 'root'
})
export class ContractResolve implements Resolve<Contract>{

  constructor(
    private contractService: ContractService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contract> {
    const params = route.params;
    return this.contractService.show(params.id);
  }

}
