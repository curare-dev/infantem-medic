import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { newMedic, authMedic, verifyToken } from '../../queries/medics.graphql';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apollo: Apollo) { }

  public register( input: any ): Observable<any>{
    return this.apollo.mutate<any>({
      mutation: newMedic,
      variables: {
        input
      }
    });
  }

  public login( input: any ): Observable<any>{
    return this.apollo.mutate<any>({
      mutation: authMedic,
      variables: {
        input
      }
    });
  }

  public validateToken(): Observable<any>{
    const token = localStorage.getItem('token') || '';
    return this.apollo.watchQuery<any>({
      query: verifyToken,
      variables: {
        token
      }
    }).valueChanges.pipe( tap(), map( resp => resp.data.verifyToken));
  }
}
