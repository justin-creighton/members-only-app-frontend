import {Component, OnInit} from '@angular/core';
import {Group, Request} from "../../types/types";
import {GroupsService} from "../../services/groups-service/groups.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss']
})
export class GroupPageComponent implements OnInit {
  isLoadingGroup: boolean = true;
  group: Group | null = null;
  requests: Request[] = [];
  messageValue: string = '';

  constructor(private groupsService: GroupsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const groupId = this.route.snapshot.params['id'];

    this.groupsService.getGroupById(groupId).subscribe(group => {
      this.group = group;
      this.isLoadingGroup = false;
    });
  }

  acceptRequest(requestId: string): void {
    this.groupsService.acceptRequest(requestId).subscribe(updatedRequests => {
      this.group!.requests = updatedRequests
    });
  }

  rejectRequest(requestId: string): void {
    this.groupsService.rejectRequest(requestId).subscribe(updatedRequests => {
      this.group!.requests = updatedRequests
    });
  }

  addMessage(): void {
    const groupId = this.route.snapshot.params['id'];

    this.groupsService.addMessage(groupId, this.messageValue).subscribe(updatedGroup => {
      this.group = updatedGroup;
      this.messageValue = '';
    })
  }
}
