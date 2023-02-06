import { GraphQLObjectType, GraphQLString } from 'graphql';

export interface PhoneValidation {
  phone: string;
  code: string;
}

export const PhoneValidationType = new GraphQLObjectType<PhoneValidation>({
  name: 'PhoneValidation',
  fields: () => ({
    phone: {
      type: GraphQLString,
      resolve: (phoneValidation) => phoneValidation.phone,
    },
    code: {
      type: GraphQLString,
      resolve: (phoneValidation) => phoneValidation.code,
    },
  }),
});
