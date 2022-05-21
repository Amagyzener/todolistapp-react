import React from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

export default class NewTaskForm extends React.Component {
	constructor(props) {
		super(props);
		/* this.state = { value: '' }; */
	}

	static defaultProps = {
		value: '',
		placeholder: 'Placeholder',
		eventChange_onlooker: () => {}
	}

	static propTypes = {
		value: PropTypes.string,
		placeholder: PropTypes.string,
		eventChange_onlooker: PropTypes.func
	}

	/* handleChange = (e) => {
		const v = e.target.value;
		this.setState({ value: v });
		this.props.eventChange_onlooker(this.state.value);
	} */

	render() {
		return <input
			className='new-todo'
			value={this.props.value}
			placeholder={this.props.placeholder}
			onChange={this.props.eventChange_onlooker}
			/* onChange={this.handleChange */
			autoFocus />;
	}
}