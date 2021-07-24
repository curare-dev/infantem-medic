import { gql } from 'apollo-angular';

export const getMedic = gql`
  query getMedic( $token: String! ){
    getMedic(token: $token){
      id
      sufijo
      nombre
      apPaterno
      apMaterno
      especialidad
      email
      numTel
    }
  }
`;

export const newMedic = gql`
  mutation newMedic( $input: MedicInput ){
    newMedic( input: $input ){
      id
    }
  }
`;

export const authMedic = gql`
  mutation authMedic( $input: AuthInput ){
    authMedic( input: $input ){
      token
    }
  }
`;

export const verifyToken = gql`
  query verifyToken( $token: String! ){
    verifyToken(token: $token)
  }
`;

export const getLocation = gql`
  query getLocation( $id: ID! ){
    getLocation(id: $id){
      street
      number
      city
      state
      postalCode
      country
    }
  }
`;

export const setLocation = gql`
  mutation medicLocation ( $input: LocationInput ){
    medicLocation( input: $input )
  }
`;
