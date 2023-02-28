import { graphql } from 'react-relay';

export const CreateUser = graphql`
  mutation CreateUserMutation($name: String!, $phone: String!, $code: String!) {
    CreateUserMutation(input: { name: $name, phone: $phone, code: $code }) {
      user {
        id
        name
        phone
      }
    }
  }
`;
