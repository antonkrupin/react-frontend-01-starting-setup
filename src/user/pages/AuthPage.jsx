import React, { useState } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/utils/validators';

import { useForm } from '../../shared/hooks/form-hook';

import './AuthPage.css';

const AuthPage = () => {
  const [isLogginMode, setLoggingMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm({
    email: {
      value: '',
      isValid: false,
    },
    password: {
      value: '',
      isValid: false,
    }
  }, false);

  const authFormSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
  };

  const switchLoggingMode = () => {
    if (!isLogginMode) {
      setFormData({
        ...formState.inputs,
        name: undefined
      },
      formState.inputs.email.isValid && formState.inputs.password.isValid,
      );
    } else {
      setFormData({
        ...formState.inputs,
        name: {
          value: '',
          isValid: false,
        }
      },
      false,
      );
    }
    setLoggingMode(prevMode => !prevMode);
  };

  return (
    <Card className="authentication">
      <form onSubmit={authFormSubmit}>
        {!isLogginMode && (
          <Input
          id="name"
          element="input"
          type="text"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a Name."
          onInput={inputHandler}
        />
        )}
        <Input
          id="email"
          element="input"
          type="email"
          label="E-mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid e-mail."
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText="Please enter a password. Min length - 8 characters."
          onInput={inputHandler}
        />
        <Button disabled={!formState.isValid}>{isLogginMode ? 'LOGIN' : 'SIGNUP'}</Button>
        <Button inverse onClick={switchLoggingMode}>SWITCH TO {isLogginMode ? 'SIGNUP' : 'LOGIN'}</Button>
      </form>
    </Card>
  )
};

export default AuthPage;