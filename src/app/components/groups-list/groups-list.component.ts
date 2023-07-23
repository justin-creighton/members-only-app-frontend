import { Component, OnInit, Input } from '@angular/core';
import { GroupsService } from 'src/app/services/groups-service/groups.service';
import { Group } from 'src/app/types/types';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss']
})
export class GroupsListComponent implements OnInit {
  @Input() isLoading: boolean = true;
  @Input() groups: Group[] = [];

  constructor(
    private groupsService: GroupsService
  ) {

  }

  ngOnInit(): void {

  }

  onClickAskToJoin(groupId: string) {
    this.groupsService.requestToJoinGroup(groupId).subscribe(() => {
      alert('Successfully submitted request');
    });
  }
}
