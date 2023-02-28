import React, { useState, Dispatch, SetStateAction } from 'react';
import { useMutation } from 'react-relay';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types/form';
import InputMask from 'react-input-mask';

import ValidationCode from '../relay/auth/ValidationCodeMutation';
import { ValidationCodeMutation } from '../__generated__/ValidationCodeMutation.graphql';
import { AuthSteps } from '../pages/AuthPage';

type InputForm = {
  phone: string;
};

interface CreateCodeStepProps {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  setPhone: Dispatch<SetStateAction<string>>;
}

const CreateCodeStep: React.FC<CreateCodeStepProps> = ({
  setCurrentStep,
  setPhone,
}) => {
  const [commit] = useMutation<ValidationCodeMutation>(ValidationCode);
  const [errorStatus, setErrorStatus] = useState<string | boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputForm>();

  const onSubmitHandler: SubmitHandler<InputForm> = async (data: InputForm) => {
    const formattedPhone = `+55${data.phone.replace(/[^\d]/g, '')}`;

    commit({
      variables: { phone: formattedPhone },
      onCompleted: ({ CreatePhoneValidation }, errors) => {
        if ((errors && errors.length > 0) || !CreatePhoneValidation?.success) {
          setErrorStatus(
            'Ocorreu um erro ao enviar o código, certifique-se de que o número está correto e tente novamente.',
          );
          return;
        }

        setPhone(formattedPhone);

        if (CreatePhoneValidation?.hasAccount) {
          setCurrentStep(AuthSteps.LOGIN);
        } else {
          setCurrentStep(AuthSteps.REGISTER);
        }
      },
    });
  };

  return (
    <>
      {errorStatus && <span>{errorStatus}</span>}
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <InputMask
          {...register('phone', {
            required: true,
          })}
          mask="(99) 9 9999-9999"
          maskChar={null}
          type="tel"
          placeholder="Digite seu número de telefone"
        />
        {errors.phone && errors.phone.type === 'required' && (
          <span>O telefone é obrigatório</span>
        )}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default CreateCodeStep;
