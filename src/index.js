import React from 'react';
import ReactDOM from 'react-dom/client';

import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';

import './style.css';

// _handleArray([1, 2, 3], Array.prototype.findIndex, (n) => n === 2)
	// return value: result of calling a 'method' with the specified 'fnc', a copy of the original 'array'
function _handleArray(array, method, fnc) {
	return [
		method.call(array, fnc),
		new Array(...array)
	];
}


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{ id: 1, content: 'Learn React', fulfilled: false, hidden: false },
				{ id: 2, content: 'Build an awesome application', fulfilled: false, hidden: false },
				{ id: 3, content: 'Enjoy yourself', fulfilled: false, hidden: false }
			],
			NewTaskForm_value: ''
		};
		this.nextId = this.state.data.length || 1;
	}

	#toggleProperty = (array, id, prop) => {
		/* const idx = array.findIndex((task) => task.id === id);
		const newData = new Array(...array); */
		const [idx, newData] = _handleArray(array, Array.prototype.findIndex, (task) => task.id === id);
		newData[idx] = { ...array[idx], [prop]: !array[idx][prop] };
		return newData;
	}

	toggleTask = (id) => {
		this.setState(({ data }) => {
			return { data: this.#toggleProperty(data, id, 'fulfilled') };
		});
	}

	createTask = (e) => {
		e.preventDefault();
		this.nextId++;
		this.setState(({ data, NewTaskForm_value }) => {
			return {
				data: [...data, { id: this.nextId, content: NewTaskForm_value || 'A new task to do' }],
				NewTaskForm_value: ''
			};
		});
	}

	deleteTask = (id) => {
		this.setState(({ data }) => {
			/* const idx = data.findIndex((task) => task.id === id);
			const newData = new Array(...data); */
			const [idx, newData] = _handleArray(data, Array.prototype.findIndex, (task) => task.id === id);
			newData.splice(idx, 1);
			/* const newData = [...data.slice(0, idx), ...data.slice(idx + 1)]; */
			return { data: newData };
		});
	}

	deleteFulfilledTasks = () => {
		this.state.data.forEach(task => {
			if (task.fulfilled) this.deleteTask(task.id);
		});
	}

	handleInputChange = (e) => {
		this.setState({ NewTaskForm_value: e.target.value });
		/* console.log(this.state.NewTaskForm_value); */
	}

	showHideTask = (id) => {
		this.setState(({ data }) => {
			return { data: this.#toggleProperty(data, id, 'hidden') };
		});
	}

	filterTasks = (filter, e) => {
		for (const btn of e.target.closest('.filters').querySelectorAll('button'))
			if (btn.classList.contains('selected')) btn.classList.remove('selected');
		e.target.classList.toggle('selected');

		this.state.data.forEach(task => {
			filter == 'active' && task.fulfilled && this.showHideTask(task.id) ||
			filter == 'completed' && !task.fulfilled && this.showHideTask(task.id) ||
			task.hidden && this.showHideTask(task.id); // the default case (if filter == 'all' || show the rest)
		});
	}

	render() {
		return (
			<section className='todoapp'>
				<header className='header'>
					<h1>ToDo List</h1>
					<form onSubmit={this.createTask}>
						<NewTaskForm
							placeholder='What needs to be done?'
							value={this.state.NewTaskForm_value}
							eventChange_onlooker={this.handleInputChange} />
						<button className='icon icon-add' type='submit'></button>
					</form>
				</header>
				<section className='main'>
					<TaskList
						items={this.state.data}
						eventToggle_onlooker={this.toggleTask}
						eventDestroy_onlooker={this.deleteTask} />
					<Footer
						tasksLeft={this.state.data.filter((task) => !task.fulfilled).length}
						eventRemoveFulfilled_onlooker={this.deleteFulfilledTasks}
						eventFilter_onlooker={this.filterTasks} />
				</section>
			</section>
		);
	}
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);