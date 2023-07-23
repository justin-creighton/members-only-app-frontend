import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GroupsService } from 'src/app/services/groups-service/groups.service';

@Component({
  selector: 'app-create-group-page',
  templateUrl: './create-group-page.component.html',
  styleUrls: ['./create-group-page.component.scss']
})
export class CreateGroupPageComponent {
  nameValue: string = '';

  constructor(
    private router: Router,
    private groupsService: GroupsService) {
  }

  onClickCreateGroup(): void {
    this.groupsService.createGroup(this.nameValue).subscribe(newGroupId => {
      this.router.navigateByUrl(`/groups/${newGroupId}`);
    })
  }
}
