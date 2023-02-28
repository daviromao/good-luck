import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { createPhoneValidation } from '../phoneValidationService';
import * as Yup from 'yup';
import { findUserByPhone } from '../../user/userService';

type CreatePhoneValidationArgs = {
  phone: string;
};

const createPhoneValidationSchema = Yup.object().shape({
  phone: Yup.string().required(),
});

export const CreatePhoneValidation = mutationWithClientMutationId({
  name: 'CreatePhoneValidation',
  description: 'Create a new phone validation code',
  inputFields: {
    phone: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    success: {
      type: GraphQLBoolean,
    },
    hasAccount: {
      type: GraphQLBoolean,
    },
  },

  async mutateAndGetPayload({ phone }: CreatePhoneValidationArgs) {
    await createPhoneValidationSchema.validate({ phone });
    const wasCached = await createPhoneValidation(phone);

    const user = await findUserByPhone(phone);

    return { success: wasCached, hasAccount: !!user };
  },
});
