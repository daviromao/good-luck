import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { verifyPhoneValidation } from '../../phoneValidation/phoneValidationService';
import { createUser, findUserByPhone } from '../userService';
import { UserType } from '../userType';

export const CreateUserMutation = mutationWithClientMutationId({
  name: 'CreateUser',
  description: 'Create a new user',
  inputFields: {
    name: { type: GraphQLString },
    phone: { type: GraphQLString },
    code: { type: GraphQLString },
  },
  outputFields: {
    user: {
      type: UserType,
      resolve: (user) => user,
    },
  },

  async mutateAndGetPayload({ name, phone, code }) {
    const existsUser = await findUserByPhone(phone);

    if (existsUser) {
      throw new Error('User already exists');
    }

    if (!(await verifyPhoneValidation(phone, code))) {
      throw new Error('Invalid code');
    }

    const user = await createUser({ name, phone });

    return user;
  },
});
