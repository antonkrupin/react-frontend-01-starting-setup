import React, { useReducer } from 'react';

import './Input.css';

const inputReducer = (state, action) => {
	switch(action.type) {
		case 'CHANGE': {
			return {
				...state,
				value: action.val,
				isValid: true,
			}
		}
		default: {
			return state;
		}
	}	
}


const Input = (props) => {
	const [inputState, dispatch] = useReducer(inputReducer, {value: '', isValid: false});

	const changeHandler = (e) => {
		dispatch({type: 'CHANGE', val: e.target.value});
	};

	const {
		id,
		label,
		type,
		placeholder,
		rows,
		errorText,
	} = props;

	const element = 
		props.element === 'input' ? ( 
			<input
				id={id}
				type={type}
				placeholder={placeholder}
				onChange={changeHandler}
				value={inputState.value}
			/>
		) : (
			<textarea
				id={id}
				rows={rows || 3}
				onChange={changeHandler}
				value={inputState.value}
			/>
		);
	return (
		<div className={`form-control ${!inputState.isValid && 'form-control--invalid'}`}>
			<label htmlFor={id}>{label}</label>
			{element}
			{!inputState.isValid && <p>{errorText}</p>}
		</div>
	)
};

export default Input;