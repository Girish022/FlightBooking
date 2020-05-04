import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  home() {
    this.route.navigate(['']);
  }

  admin() {
    this.route.navigate(['admin']);
  }

}
