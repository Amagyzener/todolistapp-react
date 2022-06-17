import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import './Task.css';


export default function Task({ content, fulfilled, hidden, created, taskOnToggle, taskOnDestroy }) {
	const taskState = ((fulfilled && ' completed') || '') + ((hidden && ' editing') || '') || '';
	const [timer, setTimer] = useState(false); // timer state
	const [secs, setSecs] = useState(0); // seconds

	useEffect(() => {
		// componentDidMount() + componentDidUpdate()
		let tId = null;
		if (timer) {
			//console.log('setInterval');
			tId = setInterval(() => {
				//setSecs(secs => secs + 1);
				_updateTimer();
				//console.log('id:', tId, 'active:', timer);
			}, 1000);
		} else if (!timer && secs != 0) {
			//console.log('clearInterval');
			clearInterval(tId);
		}

		// componentWillUnmount()
		return () => clearInterval(tId);
	}, [timer/* , secs */]); // only re-run the effect if 'timer' changes

	function _toggleTimer(e) {
		for (const btnClass of ['icon-play', 'icon-pause'])
			e.target.classList.toggle(btnClass);
		setTimer(!timer);
	}

	function _formatTimer() {
		let m = Math.floor(secs / 60),
			s = secs % 60;
		if (m < 10) m = `0${m}`;
		if (s < 10) s = `0${s}`;
		return `${m}:${s}`;
	}

	let lastTime = performance.now(),
		diff = 0;
	function _updateTimer() {
		diff += performance.now() - lastTime;
		//console.log(secs + Math.floor(diff / 1000));
		setSecs(secs + Math.floor(diff / 1000));
		lastTime = performance.now();
	}

	return (
		<li className={`task${taskState}`}>
			<div className='view'>
				<input
					className='toggle'
					type='checkbox'
					onClick={taskOnToggle}
				/>
				<label>
					<span className='title'>{content}</span>
					<span className='description'>{formatDistanceToNow(created)}</span>
				</label>
				<span className='timer'>
					<button className='icon icon-play' onClick={(e) => _toggleTimer(e)}></button>
					<span>{_formatTimer()}</span>
				</span>
				<button className='icon icon-edit' /* onClick={taskOnEdit} */></button>
				<button className='icon icon-destroy' onClick={taskOnDestroy}></button>
			</div>
		</li>
	);
}

Task.defaultProps = {
	content: '[content]',
	fulfilled: false,
	hidden: false,
	created: new Date,
	taskOnToggle: () => {},
	taskOnDestroy: () => {},
};

Task.propTypes = {
	content: PropTypes.string,
	fulfilled: PropTypes.bool,
	hidden: PropTypes.bool,
	created: PropTypes.instanceOf(Date),
	timer: PropTypes.number,
	taskOnToggle: PropTypes.func,
	taskOnDestroy: PropTypes.func,
};