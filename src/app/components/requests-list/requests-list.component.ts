import {Component, Input, EventEmitter, Output} from '@angular/core';
import {Request} from "../../types/types";

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss']
})
export class RequestsListComponent {
  @Input() requests: Request[] = [];
  @Input() messages: any;
  @Output() accept = new EventEmitter<string>();
  @Output() reject = new EventEmitter<string>();

  onClickAccept(requestId: string) {
    this.accept.emit(requestId);
  }

  onClickReject(requestId: string) {
    this.reject.emit(requestId);
  }
}
