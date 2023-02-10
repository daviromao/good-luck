import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { UserType } from '../../user/userType';
import { loginWithPhoneAndCode } from '../authService';

export const Login = mutationWithClientMutationId({
  name: 'Login',
  description: 'Login with phone and code',
  inputFields: {
    phone: { type: GraphQLString },
    code: { type: GraphQLString },
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: (auth) => auth.token,
    },
    user: {
      type: UserType,
      resolve: (auth) => auth.user,
    },
  },
  async mutateAndGetPayload({ phone, code }) {
    const auth = await loginWithPhoneAndCode(phone, code);

    return auth;
  },
});
