import { graphql } from 'react-relay';

export const Login = graphql`
  mutation LoginMutation($phone: String!, $code: String!) {
    Login(input: { phone: $phone, code: $code }) {
      token
      user {
        id
        name
        phone
      }
    }
  }
`;
