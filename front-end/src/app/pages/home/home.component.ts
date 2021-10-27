import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home/home.service';
import { Home } from '@models/home.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public home: Home;
  constructor(
    private router: Router,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.homeService.all().subscribe(home => {
      this.home = home;
    });
  }

}
