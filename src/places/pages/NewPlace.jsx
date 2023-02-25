import React, { useCallback, useReducer } from 'react';

import Input from '../../shared/components/FormElements/Input';

import Button from '../../shared/components/FormElements/Button';

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/utils/validators';

import { useForm } from '../../shared/hooks/form-hook';

import './NewPlace.css'

const NewPlace = () => {
	const [formState, inputHandler] = useForm({
		title: {
			value: '',
			isValid: false,
		},
		description: {
			value: '',
			isValid: false,
		},
		address: {
			value: '',
			isValid: false,
		},
	}, false);

	const formSubmitHandler = (e) => {
		e.preventDefault();
		console.log(formState.inputs)
	};

	return (
		<form className="place-form" onSubmit={formSubmitHandler}>
			<Input
				id="title"
				element="input"
				type="text"
				label="Title"
				errorText={"Input valid value"}
				validators={[VALIDATOR_REQUIRE()]}
				onInput={inputHandler}
			/>
			<Input
				id="description"
				element="textarea"
				label="Description"
				errorText={"Enter valid value for description (5 chars min)"}
				validators={[VALIDATOR_MINLENGTH(5)]}
				onInput={inputHandler}
			/>
			<Input
				id="address"
				element="input"
				type="text"
				label="Address"
				errorText={"Input valid address"}
				validators={[VALIDATOR_REQUIRE()]}
				onInput={inputHandler}
			/>
			<Button type="submit" disabled={!formState.isValid}>ADD PLACE</Button>
		</form>
	);
};

export default NewPlace;