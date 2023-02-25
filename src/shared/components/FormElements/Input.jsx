import React, { useReducer, useEffect } from 'react';

import { validate } from '../../utils/validators';

import './Input.css';

const inputReducer = (state, action) => {
	switch(action.type) {
		case 'CHANGE': {
			return {
				...state,
				value: action.val,
				isValid: validate(action.val, action.validators),
			}
		}
		case 'TOUCH': {
			return {
				...state,
				isTouch: true,
			}
		}
		default: {
			return state;
		}
	}	
}


const Input = (props) => {
	const {
		id,
		label,
		type,
		placeholder,
		rows,
		errorText,
		validators,
		onInput,
	} = props;

	const [inputState, dispatch] = useReducer(inputReducer, {
		value: props.initialValue || '', 
		isValid: props.initialValid || false,
		isTouch: false
	});

	const { value, isValid } = inputState;

	useEffect(() => {
		onInput(id, value, isValid)
	}, [id, value, isValid, onInput]);

	const changeHandler = (e) => {
		dispatch({type: 'CHANGE', val: e.target.value, validators: validators});
	};

	const touchHandler = () => {
		dispatch({type: 'TOUCH', })
	};

	const element = 
		props.element === 'input' ? ( 
			<input
				id={id}
				type={type}
				placeholder={placeholder}
				onChange={changeHandler}
				onBlur={touchHandler}
				value={inputState.value}
			/>
		) : (
			<textarea
				id={id}
				rows={rows || 3}
				onChange={changeHandler}
				onBlur={touchHandler}
				value={inputState.value}
			/>
		);
	return (
		<div
			className={`form-control ${!inputState.isValid && inputState.isTouch && 'form-control--invalid'}`}>
			<label
				htmlFor={id}
			>
				{label}
			</label>
				{element}
			{!inputState.isValid && inputState.isTouch && <p>{errorText}</p>}
		</div>
	)
};

export default Input;