import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home/home.service';
import { Home } from '@models/home.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public home: Home;
  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.homeService.all().subscribe(home => {
      this.home = home;
    });
  }

}
