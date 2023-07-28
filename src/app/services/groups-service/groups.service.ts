import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { Group, Request } from 'src/app/types/types';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  constructor(private http: HttpClient, private auth: AngularFireAuth) {}

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>('/api/groups');
  }

  getGroupsForUser(): Observable<Group[]> {
    return new Observable<Group[]>((observer) => {
      this.auth.user.subscribe((user) => {
        user?.getIdToken().then((token) => {
          if (token) {
            this.http
              .get<Group[]>(
                `/api/users/${user.uid}/groups`,
                this.httpOptionsWithAuthToken(token)
              )
              .subscribe((groups) => {
                observer.next(groups);
              });
          }
        });
      });
    });
  }

  requestToJoinGroup(groupId: string): Observable<void> {
    return new Observable<void>((observer) => {
      this.auth.user.subscribe((user) => {
        user?.getIdToken().then((token) => {
          if (token) {
            this.http
              .post(
                `/api/groups/${groupId}/request`,
                {},
                this.httpOptionsWithAuthToken(token)
              )
              .subscribe((groups) => {
                observer.next();
              });
          }
        });
      });
    });
  }

  createGroup(name: string): Observable<string> {
    return new Observable<string>((observer) => {
      this.auth.user.subscribe((user) => {
        user?.getIdToken().then((token) => {
          if (token) {
            this.http
              .post<string>(
                '/api/groups',
                { name },
                this.httpOptionsWithAuthToken(token)
              )
              .subscribe((newGroupId) => observer.next(newGroupId));
          }
        });
      });
    });
  }

  getGroupById(groupId: string) {
    return new Observable<Group | null>((observer) => {
      this.auth.user.subscribe((user) => {
        user?.getIdToken().then((token) => {
          if (token) {
            this.http
              .get<Group | null>(
                `/api/groups/${groupId}`,
                this.httpOptionsWithAuthToken(token)
              )
              .subscribe((group) => {
                observer.next(group);
              });
          }
        });
      });
    });
  }

  addMessage(groupId: string, text: string): Observable<Group> {
    return new Observable<Group>((observer) => {
      this.auth.user.subscribe((user) => {
        user?.getIdToken().then((token) => {
          if (token) {
            this.http
              .post<Group>(
                `/api/groups/${groupId}/messages`,
                {text},
                this.httpOptionsWithAuthToken(token)
              )
              .subscribe((updatedGroup) => observer.next(updatedGroup));
          }
        });
      });
    });
  }

  acceptRequest(requestId: string): Observable<Request[]> {
    return new Observable<Request[]>((observer) => {
      this.auth.user.subscribe((user) => {
        user?.getIdToken().then((token) => {
          if (token) {
            this.http
              .post<Request[]>(
                `/api/requests/${requestId}/accept`,
                {},
                this.httpOptionsWithAuthToken(token)
              )
              .subscribe((updatedRequests) => observer.next(updatedRequests));
          }
        });
      });
    });
  }

  rejectRequest(requestId: string): Observable<Request[]> {
    return new Observable<Request[]>((observer) => {
      this.auth.user.subscribe((user) => {
        user?.getIdToken().then((token) => {
          if (token) {
            this.http
              .post<Request[]>(
                `/api/groups/${requestId}/reject`,
                {},
                this.httpOptionsWithAuthToken(token)
              )
              .subscribe((updatedRequests) => observer.next(updatedRequests));
          }
        });
      });
    });
  }

  httpOptionsWithAuthToken(token: string) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authtoken: token,
      }),
    };
  }
}
