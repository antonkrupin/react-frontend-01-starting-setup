import React, { useState, useContext } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/utils/validators';

import { AuthContext } from '../../shared/context/Auth-context';

import { useForm } from '../../shared/hooks/form-hook';

import './AuthPage.css';

const AuthPage = () => {
  const auth = useContext(AuthContext);

  const [isLogginMode, setLoggingMode] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

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

  const authFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (isLogginMode) {
      try {
        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          })
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        setIsLoading(false);
        auth.login();
      } catch (err) {
        setIsLoading(false);
        setError(err.message || 'Something went wrong. Please try again.');
      }
    } else {
      try {
        const response = await fetch('http://localhost:5000/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          })
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        setIsLoading(false);
        auth.login();
      } catch (err) {
        setIsLoading(false);
        setError(err.message || 'Something went wrong. Please try again.');
      }
    }
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

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
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
          <Button
            disabled={!formState.isValid}
          >
            {isLogginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
          <Button inverse onClick={switchLoggingMode}>SWITCH TO {isLogginMode ? 'SIGNUP' : 'LOGIN'}</Button>
        </form>
      </Card>
    </>
  )
};

export default AuthPage;