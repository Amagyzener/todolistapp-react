import React from 'react'
import PropTypes from 'prop-types'

import './TasksFilter.css'

export default function TasksFilter({ taskOnFilter }) {
   return (
      <ul className="filters">
         <li>
            <button className="selected" onClick={taskOnFilter.bind(this, 'all')}>
               All
            </button>
         </li>
         <li>
            <button onClick={taskOnFilter.bind(this, 'active')}>Active</button>
         </li>
         <li>
            <button onClick={taskOnFilter.bind(this, 'completed')}>Completed</button>
         </li>
      </ul>
   )
}

TasksFilter.defaultProps = {
   taskOnFilter: () => {},
}

TasksFilter.propTypes = {
   taskOnFilter: PropTypes.func,
}
