import { gql } from 'apollo-angular';

export const getMedic = gql`
  query getMedic( $token: String! ){
    getMedic(token: $token){
      id
      sufijo
      nombre
      apPaterno
      especialidad
      email
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