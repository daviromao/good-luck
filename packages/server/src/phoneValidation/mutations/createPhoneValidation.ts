import { GraphQLBoolean, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { createPhoneValidation } from '../phoneValidationService';

export const CreatePhoneValidation = mutationWithClientMutationId({
  name: 'CreatePhoneValidation',
  description: 'Create a new phone validation code',
  inputFields: {
    phone: { type: GraphQLString },
  },
  outputFields: {
    success: {
      type: GraphQLBoolean,
    },
  },

  async mutateAndGetPayload({ phone }) {
    const wasCached = await createPhoneValidation(phone);

    return { success: wasCached };
  },
});
