import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import './Task.css';

export default class Task extends React.Component {
	constructor(props) {
		super(props);
		/* this.state = { fulfilled: false }; */
	}

	/* handleClick = () => {
		this.setState(prevState => ({ fulfilled: !prevState.fulfilled }));
	} */

	render() {
		const taskState =
			((this.props.fulfilled && ' completed') || '') + ((this.props.hidden && ' editing') || '') || '';
		return (
			<li className={`task${taskState}`}>
				<div className='view'>
					<input
						className='toggle'
						type='checkbox'
						/* onClick={this.handleClick} */
						onClick={this.props.taskOnToggle}
					/>
					<label>
						<span className='description'>{this.props.content}</span>
						<span className='created'>{formatDistanceToNow(new Date())}</span>
					</label>
					<button className='icon icon-edit' /* onClick={this.props.taskOnEdit} */></button>
					<button className='icon icon-destroy' onClick={this.props.taskOnDestroy}></button>
				</div>
			</li>
		);
	}
}
