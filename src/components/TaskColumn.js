import React from 'react';
import TaskCard from './TaskCard';
import '../styles/Column.css'; // Column-specific CSS

const TaskColumn = ({ title, tasks }) => {
  return (
    <div className="column">
      <h2>{title}</h2>
      {!tasks === 0 ? (
        <p>No tasks available</p>
      ) : (
        tasks.map((task) => (
          task && task.id ? (
            <TaskCard key={task.id} task={task} />
          ) : (
            <p key="error">Error: Invalid Task Data</p>
          )
        ))
      )}
    </div>
  );
};

export default TaskColumn;
