import { Component, Input, OnInit } from '@angular/core';
import { Zone } from 'src/app/models/zone';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css']
})
export class ZoneComponent implements OnInit {

  @Input('zone') zone: Zone = new Zone();
  constructor() { }

  ngOnInit(): void {
  }

}
