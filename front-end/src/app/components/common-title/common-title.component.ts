import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-common-title',
  templateUrl: './common-title.component.html',
  styleUrls: ['./common-title.component.scss']
})
export class CommonTitleComponent implements OnInit {

  @Input() public title = 'Default title';
  @Input() public subtitle: string;
  @Input() public icon = 'manage_accounts' ;
  @Input() public navigation = true;

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  public back(): void {
    this.location.back();
  }

}
