import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from './TasksFilter';
import './Footer.css';


export default function Footer({ tasksLeft, eventRemoveFulfilled_onlooker, eventFilter_onlooker }) {
	return (
		<footer className='footer'>
			<span className='todo-count'>
				<strong>{tasksLeft}</strong> item(s) left
			</span>
			<TasksFilter taskOnFilter={eventFilter_onlooker} />
			<button className='clear-completed' onClick={eventRemoveFulfilled_onlooker}>
				Clear completed
			</button>
		</footer>
	);
}

Footer.defaultProps = {
	tasksLeft: 0,
	eventRemoveFulfilled_onlooker: () => {},
	eventFilter_onlooker: () => {},
};

Footer.propTypes = {
	tasksLeft: PropTypes.number,
	eventRemoveFulfilled_onlooker: PropTypes.func,
	eventFilter_onlooker: PropTypes.func,
};