import React from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';


export default function NewTaskForm({ value, placeholder, eventChange_onlooker }) {
	return (
		<input
			className='new-todo'
			value={value}
			placeholder={placeholder}
			onChange={eventChange_onlooker}
			autoFocus
		/>
	);
}

NewTaskForm.defaultProps = {
	value: '',
	placeholder: 'Placeholder',
	eventChange_onlooker: () => {},
};

NewTaskForm.propTypes = {
	value: PropTypes.string,
	placeholder: PropTypes.string,
	eventChange_onlooker: PropTypes.func,
};