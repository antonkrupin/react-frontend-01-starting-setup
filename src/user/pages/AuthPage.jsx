import React, { useState, useContext } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/utils/validators';

import { AuthContext } from '../../shared/context/Auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useForm } from '../../shared/hooks/form-hook';

import './AuthPage.css';

const AuthPage = () => {
  const auth = useContext(AuthContext);

  const [isLogginMode, setLoggingMode] = useState(true);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

    if (isLogginMode) {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
          'Content-Type': 'application/json'
          }
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {

      }
    } else {
      try {
        const formData = new FormData();
        formData.append('email', formState.inputs.email.value);
        formData.append('name', formState.inputs.name.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('image', formState.inputs.image.value);

        const responseData = await sendRequest(
          'http://localhost:5000/api/users/signup', 
          'POST',
          formData,
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {

      }
    }
  };

  const switchLoggingMode = () => {
    if (!isLogginMode) {
      setFormData({
        ...formState.inputs,
        name: undefined,
        image: undefined,
      },
      formState.inputs.email.isValid && formState.inputs.password.isValid,
      );
    } else {
      setFormData({
        ...formState.inputs,
        name: {
          value: '',
          isValid: false,
        },
        image: {
          value: null,
          isValid: false,
        }
      },
      false,
      );
    }
    setLoggingMode(prevMode => !prevMode);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
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
          {!isLogginMode && <ImageUpload id="image" center onInput={inputHandler} />}
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