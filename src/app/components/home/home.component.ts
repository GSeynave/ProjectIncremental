import { Component, OnInit } from '@angular/core';
import { Zone } from 'src/app/models/zone';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  zoneTeleport: Zone = new Zone();
  constructor() { }

  ngOnInit(): void {
  }

  utiliserPortail(zoneTeleport: Zone) {
    this.zoneTeleport = zoneTeleport;
  }
}
