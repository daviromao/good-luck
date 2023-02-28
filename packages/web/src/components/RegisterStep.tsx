import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-relay';
import InputMask from 'react-input-mask';
import { CreateUserMutation } from '../__generated__/CreateUserMutation.graphql';
import { CreateUser } from '../relay/auth/CreateUserMutation';
import { useNavigate } from 'react-router-dom';

type InputForm = {
  phone: string;
  name: string;
  code: string;
};

interface RegisterStepProps {
  usePhone: string;
}

const RgisterStep: React.FC<RegisterStepProps> = ({ usePhone }) => {
  const [commit] = useMutation<CreateUserMutation>(CreateUser);
  const { register, handleSubmit } = useForm<InputForm>({
    defaultValues: { phone: usePhone },
  });

  const navigate = useNavigate();

  const onSubmitHandler: SubmitHandler<InputForm> = async (data: InputForm) => {
    commit({
      variables: { phone: data.phone, code: data.code, name: data.name },
      onCompleted: (_, errors) => {
        if (errors && errors.length > 0) {
          console.log(errors);
          return;
        }

        //TODO: usar toast de sucesso
        navigate('/app');
      },
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <InputMask
          type="tel"
          {...register('phone')}
          mask="(99) 9 9999-9999"
          value={usePhone.replace('+55', '')}
          disabled
        />
        <input
          type="text"
          {...register('name')}
          placeholder="Digite seu nome"
        />
        <InputMask
          type="text"
          {...register('code')}
          mask="999999"
          maskChar={''}
        />
        <button type="submit">Registrar</button>
      </form>
    </>
  );
};

export default RgisterStep;
