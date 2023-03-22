import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/utils/validators';

import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/Auth-context';

const UpdatePlace = () => {
  const pid = useParams().pid;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [ place, setPlace ] = useState();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [formState, inputHandler, setFormData] = useForm({
    title: {
      value: '',
      isValid: false,
    },
    description: {
      value: '',
      isValid: false,
    }
  }, false);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
				const responseData = await sendRequest(`http://localhost:5000/api/places/${pid}`);
				setPlace(responseData.place);
				setFormData({
					title: {
						value: responseData.place.title,
						isValid: true,
					},
					description: {
						value: responseData.place.description,
						isValid: true,
					}
				}, true);
			} catch (err) {}

    }
    fetchPlace();
  }, [sendRequest, pid, setFormData]);

  const placeUpdateSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${pid}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          'Content-Type': 'application/json'
        },
      );
      navigate(`/${auth.userId}/places`);
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!error && !place && (
        <div className="center">
          <Card>
            <h2>Could not find place!</h2>
          </Card>
        </div>
      )}
      {!isLoading && place && (
				<form className="place-form" onSubmit={placeUpdateSubmitHandler}>
					<Input
						id="title"
						element="input"
						type="text"
						label="Title"
						validators={[VALIDATOR_REQUIRE()]}
						errorText="Please enter a valid title."
						onInput={inputHandler}
						initialValue={place.title}
						initialValid={true}
					/>
					<Input
						id="description"
						element="textarea"
						label="Description"
						validators={[VALIDATOR_MINLENGTH(5)]}
						errorText="Please enter a valid description. 5 chars min."
						onInput={inputHandler}
						initialValue={place.description}
						initialValid={true}
					/>
					<Button type="submit" disabled={!formState.isValid} >UPDATE PLACE</Button>
				</form>
			)}
    </>
  )
};

export default UpdatePlace;