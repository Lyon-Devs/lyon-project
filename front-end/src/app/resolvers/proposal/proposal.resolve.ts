import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Proposal } from '@models/proposal.model';
import { ProposalService } from '@services/proposal/proposal.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProposalResolve implements Resolve<Proposal>{

  constructor(
    private proposalService: ProposalService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Proposal> {
    const params = route.params;
    return this.proposalService.show(params.id);
  }

}
