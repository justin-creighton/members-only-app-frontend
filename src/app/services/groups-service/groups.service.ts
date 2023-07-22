import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { Group } from 'src/app/types/types';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(
    private http: HttpClient,
    private auth: AngularFireAuth
  ) { }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>('/api/groups');
  }

  getGroupsForUser(): Observable<Group[]> {
    return new Observable<Group[]>(observer => {
      this.auth.user.subscribe(user => {
        user?.getIdToken().then(token => {
          if (token) {
            this.http.get<Group[]>(`/api/users/${user.uid}/groups`, this.httpOptionsWithAuthToken(token)).subscribe(groups => {
              observer.next(groups);
            });
          }
        })
      })
    });
  }

  requestToJoinGroup(groupId: string): Observable<void> {
    return new Observable<void>(observer => {
      this.auth.user.subscribe(user => {
        user?.getIdToken().then(token => {
          if (token) {
            this.http.post(`/api/groups/${groupId}/request`, this.httpOptionsWithAuthToken(token)).subscribe(groups => {
              observer.next();
            });
          }
        })
      })
    });
  }

  httpOptionsWithAuthToken(token: string) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'AuthToken': token,
      })
    }
  }
}
