import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { verifyPhoneValidation } from '../../phoneValidation/phoneValidationService';
import { createUser, findUserByPhone } from '../userService';
import { UserType } from '../userType';
import * as Yup from 'yup';

type CreateUserArgs = {
  name: string;
  phone: string;
  code: string;
};

const createUserSchema = Yup.object().shape({
  name: Yup.string().required().min(3).max(50),
  phone: Yup.string().required(),
  code: Yup.string().required().length(6),
});

export const CreateUserMutation = mutationWithClientMutationId({
  name: 'CreateUser',
  description: 'Create a new user',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    phone: { type: new GraphQLNonNull(GraphQLString) },
    code: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    user: {
      type: UserType,
      resolve: (user) => user,
    },
  },

  async mutateAndGetPayload(args: CreateUserArgs) {
    const existsUser = await findUserByPhone(args.phone);

    await createUserSchema.validate(args);

    if (existsUser) {
      throw new Error('User already exists');
    }

    if (!(await verifyPhoneValidation(args.phone, args.code))) {
      throw new Error('Invalid code');
    }

    const user = await createUser({ name: args.name, phone: args.phone });

    return user;
  },
});
