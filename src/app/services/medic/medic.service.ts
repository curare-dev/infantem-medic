import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { getLocation, setLocation, getMedic } from 'src/app/queries/medics.graphql';

@Injectable({
  providedIn: 'root'
})
export class MedicService {

  constructor(private apollo: Apollo) { }

  public getMedic( token: string ): Observable<any>{
    return this.apollo.watchQuery<any>({
      query: getMedic,
      variables: {
        token
      }
    }).valueChanges;
  }

  public getMedicLocation(medicId: any): Observable<any>{
    console.log(medicId);
    return this.apollo.watchQuery<any>({
      query: getLocation,
      variables: {
        id: medicId
      }
    }).valueChanges;
  }

  public setMedicLocation(input: any){
    return this.apollo.mutate<any>({
      mutation: setLocation,
      variables: {
        input
      }
    });
  }
}
