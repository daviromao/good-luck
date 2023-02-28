import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-relay';
import { useAuth } from '../contexts/AuthContext';
import { Login } from '../relay/auth/LoginMutation';
import { LoginMutation } from '../__generated__/LoginMutation.graphql';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';

type InputForm = {
  phone: string;
  code: string;
};

interface LoginStepProps {
  usePhone: string;
}

const LoginStep: React.FC<LoginStepProps> = ({ usePhone }) => {
  const [commit] = useMutation<LoginMutation>(Login);
  const { register, handleSubmit } = useForm<InputForm>({
    defaultValues: { phone: usePhone },
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmitHandler: SubmitHandler<InputForm> = async (data: InputForm) => {
    commit({
      variables: { phone: data.phone, code: data.code.replace(/\D/g, '') },
      onCompleted: ({ Login }, errors) => {
        if (errors && errors.length > 0) {
          console.log(errors);
          return;
        }

        if (!Login?.token || !Login?.user) {
          console.log('Ocorreu um erro ao fazer login');
          return;
        }

        login({ user: Login?.user, token: Login?.token });
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
        <InputMask
          type="text"
          {...register('code')}
          mask="999999"
          maskChar={''}
        />
        <button type="submit">Entrar</button>
      </form>
    </>
  );
};

export default LoginStep;
