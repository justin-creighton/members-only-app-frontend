import { Component, OnInit, Input } from '@angular/core';
import { Group } from 'src/app/types/types';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss']
})
export class GroupsListComponent implements OnInit {
  @Input() isLoading: boolean = true;
  @Input() groups: Group[] = [];

  constructor() {

  }

  ngOnInit(): void {

  }
}
