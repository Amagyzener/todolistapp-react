import React from 'react';
import PropTypes from 'prop-types';

import Task from './Task';
import './TaskList.css';


export default function TaskList({ items, eventToggle_onlooker, eventDestroy_onlooker, eventTimer_onlooker }) {
	const elements = items.map(item => {
		/* console.log(timers, item.id); */
		return (
			<Task
				key={item.id}
				content={item.content}
				fulfilled={item.fulfilled}
				hidden={item.hidden}
				created={item.created}
				taskOnToggle={eventToggle_onlooker.bind(this, item.id)}
				taskOnDestroy={eventDestroy_onlooker.bind(this, item.id)}
				taskOnTimer={eventTimer_onlooker.bind(this, item.id)}
				/* taskOnEdit={} */
			/>
		);
	});

	return <ul className='task-list'>{elements}</ul>;
}

TaskList.defaultProps = {
	items: [],
	eventToggle_onlooker: () => {},
	eventDestroy_onlooker: () => {},
	eventTimer_onlooker: () => {},
};

TaskList.propTypes = {
	items: PropTypes.array,
	eventToggle_onlooker: PropTypes.func,
	eventDestroy_onlooker: PropTypes.func,
	eventTimer_onlooker: PropTypes.func
};