import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Zone } from 'src/app/models/zone';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css']
})
export class ZoneComponent implements OnInit {

  @Input('zone') zone: Zone = new Zone();
  @Output() zoneTeleport: EventEmitter<Zone> = new EventEmitter<Zone>();
  constructor() { }

  ngOnInit(): void {
  }

  utiliserPortail(zoneTeleport: Zone){
    this.zoneTeleport.emit(zoneTeleport);
  }
}
