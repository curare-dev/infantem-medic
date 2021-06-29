import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { getMedic, newMedic, authMedic } from '../../queries/medics.graphql';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apollo: Apollo) { }
  
  public getMedic( token: string ): Observable<any>{
    return this.apollo.watchQuery<any>({
      query: getMedic,
      variables: {
        token
      }
    }).valueChanges;
  }

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
    const token = localStorage.getItem('token');
    return token ? of(true) : of(false);
  }
}
