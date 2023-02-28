import React, { useState } from 'react';
import CreateCodeStep from '../components/CreateCodeStep';
import LoginStep from '../components/LoginStep';
import RegisterStep from '../components/RegisterStep';

export enum AuthSteps {
  CREATE_CODE = 1,
  LOGIN = 2,
  REGISTER = 3,
}

const AuthPage = () => {
  const [useCurrentStep, setCurrentStep] = useState<AuthSteps>(1);
  const [usePhone, setPhone] = useState<string>('');

  return (
    <>
      {useCurrentStep === AuthSteps.CREATE_CODE && (
        <CreateCodeStep setCurrentStep={setCurrentStep} setPhone={setPhone} />
      )}
      {useCurrentStep === AuthSteps.REGISTER && (
        <RegisterStep usePhone={usePhone} />
      )}
      {useCurrentStep === AuthSteps.LOGIN && <LoginStep usePhone={usePhone} />}
    </>
  );
};

export default AuthPage;
