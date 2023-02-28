import { graphql } from 'react-relay';

const ValidationCode = graphql`
  mutation ValidationCodeMutation($phone: String!) {
    CreatePhoneValidation(input: { phone: $phone }) {
      success
      hasAccount
    }
  }
`;

export default ValidationCode;
