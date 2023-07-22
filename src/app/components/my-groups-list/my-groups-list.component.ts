import { Component, Input } from '@angular/core';
import { Group } from 'src/app/types/types';

@Component({
  selector: 'app-my-groups-list',
  templateUrl: './my-groups-list.component.html',
  styleUrls: ['./my-groups-list.component.scss']
})
export class MyGroupsListComponent {
  @Input() isLoading: boolean = true;
  @Input() groups: Group[] = [];

}
