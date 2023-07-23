import { Component, OnInit, OnDestroy } from '@angular/core';
import { GroupsService } from 'src/app/services/groups-service/groups.service';
import { Group } from 'src/app/types/types';

@Component({
  selector: 'app-groups-list-page',
  templateUrl: './groups-list-page.component.html',
  styleUrls: ['./groups-list-page.component.scss']
})
export class GroupsListPageComponent implements OnInit, OnDestroy {
  isLoadingAllGroups: boolean = true;
  isLoadingUserGroups: boolean = true;
  isLoading: boolean = true;
  subscriptions: any = {};

  allGroups: Group[] = [];
  userGroups: Group[] = [];
  notUserGroups: Group[] = [];

  constructor(
    private groupsService: GroupsService
  ) {

  }

  calculateNonUserGroups(): void {
    this.notUserGroups = this.allGroups.filter(group => this.userGroups.every(userGroup => userGroup.id !== group.id));
  }

  ngOnInit(): void {
    this.subscriptions.getGroups = this.groupsService.getGroups().subscribe(groups => {
      this.allGroups = groups;
      this.isLoadingAllGroups = false;

      if (!this.isLoadingUserGroups) {
        this.isLoading = false;
        this.calculateNonUserGroups();
      }
    });

    this.subscriptions.getGroupsForUser = this.groupsService.getGroupsForUser().subscribe(groups => {
      this.userGroups = groups;
      this.isLoadingUserGroups = false;

      if (!this.isLoadingAllGroups) {
        this.isLoading = false;
        this.calculateNonUserGroups();
      }
    });
  }

  ngOnDestroy(): void {
    Object.keys(this.subscriptions).forEach(key => {
      if (this.subscriptions[key]) {
        this.subscriptions[key].unsubscribe();
      }
    })
  }
}
