import React, { useState, useEffect } from 'react';

import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';

import './App.css';

// handleArray([1, 2, 3], Array.prototype.findIndex, (n) => n === 2)
// return value: a copy of the original 'array', result of calling a 'method' with the specified 'fnc'
function handleArray(array, method, fnc) {
	return [new Array(...array), method.call(array, fnc)];
}


export default function App() {
	const [data, updateData] = useState(
		[
			{ id: 1, content: 'Learn React', fulfilled: false, hidden: false },
			{ id: 2, content: 'Build an awesome application', fulfilled: false, hidden: false },
			{ id: 3, content: 'Enjoy yourself', fulfilled: false, hidden: false },
		]
	);
	const [NewTaskForm_value, NewTaskForm_setValue] = useState('');
	let [needToFilter, applyFilter] = useState(false); // [1] «костыльный» вариант: React — отстой
	let nextId = data[data.length - 1]?.id ?? 0; // find the last item’s id or set it to 0

	useEffect(() => {
		const filter = document.querySelector('button.selected').textContent.toLowerCase();

		const newData = new Array(...data);
		newData.forEach(task => {
			(task.hidden && (task.hidden = !task.hidden))
				|| (filter == 'active' && task.fulfilled && (task.hidden = !task.hidden))
				|| (filter == 'completed' && !task.fulfilled && (task.hidden = !task.hidden));
		});
		updateData(newData);
	}, [needToFilter]); // [2] «костыльный» вариант: React — отстой

	function _toggleProperty(array, id, prop) {
		const [newData, idx] = handleArray(array, Array.prototype.findIndex, task => task.id === id);
		newData[idx] = { ...array[idx], [prop]: !array[idx][prop] };
		return newData;
	}

	function _toggleTask(id) {
		updateData(_toggleProperty(data, id, 'fulfilled'));
		applyFilter(!needToFilter); // [3] «костыльный» вариант: React — отстой
	}

	function _createTask(e) {
		e.preventDefault();

		if (document.querySelector('button.selected').textContent.toLowerCase() == 'completed')
			return alert('На этой вкладке нельзя добавлять заметки!');
		if (!NewTaskForm_value.length)
			return alert('Поле ввода не должно быть пустым!');

		updateData([...data, { id: ++nextId, content: NewTaskForm_value, created: new Date }]);
		NewTaskForm_setValue('');
	}

	function _deleteTask(id) {
		const [newData, idx] = handleArray(data, Array.prototype.findIndex, task => task.id === id);
		newData.splice(idx, 1);
		updateData(newData);
	}

	function _deleteFulfilledTasks() {
		const newData = data.filter(task => !task.fulfilled);
		updateData(newData);
	}

	function _handleInputChange(e) {
		NewTaskForm_setValue(e.target.value);
	}

	function _filterTasks(filter, e) {
		if (e) {
			for (const btn of e.target.closest('.filters').querySelectorAll('button'))
				if (btn.classList.contains('selected')) btn.classList.remove('selected');
			e.target.classList.toggle('selected');
		}

		const newData = new Array(...data);
		newData.forEach(task => {
			(task.hidden && (task.hidden = !task.hidden))
				|| (filter == 'active' && task.fulfilled && (task.hidden = !task.hidden))
				|| (filter == 'completed' && !task.fulfilled && (task.hidden = !task.hidden));
			/* short-circuit evaluation; аналогично записи:
			if (task.hidden)
				task.hidden = !task.hidden; // the default case (if filter == 'all' || show the rest)
			if (filter == 'active' && task.fulfilled)
				task.hidden = !task.hidden;
			if (filter == 'completed' && !task.fulfilled)
				task.hidden = !task.hidden; */
		});

		updateData(newData);
	}

	return (
		<section className='todoapp'>
			<header className='header'>
				<h1>ToDo List</h1>
				<form onSubmit={(e) => _createTask(e)}>
					<NewTaskForm
						placeholder='What needs to be done?'
						value={NewTaskForm_value}
						eventChange_onlooker={(e) => _handleInputChange(e)}
					/>
					<button className='icon icon-add' type='submit'></button>
				</form>
			</header>
			<section className='main'>
				<TaskList
					items={data}
					eventToggle_onlooker={(id) => _toggleTask(id)}
					eventDestroy_onlooker={(id) => _deleteTask(id)}
					eventTimer_onlooker={(id) => console.warn(id)}
					/* timers={this.state.timers} */
				/>
				<Footer
					tasksLeft={data.filter(task => !task.fulfilled).length}
					eventRemoveFulfilled_onlooker={_deleteFulfilledTasks}
					eventFilter_onlooker={(filter, e) => _filterTasks(filter, e)}
				/>
			</section>
		</section>
	);
}