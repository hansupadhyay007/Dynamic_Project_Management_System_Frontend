import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import '../styles/TaskForm.css';

const ADD_TASK = gql`
  mutation AddTask($projectId: ID!, $title: String!, $description: String, $status: String!, $priority: String, $dueDate: String) {
    addTask(
      projectId: $projectId,
      title: $title,
      description: $description,
      status: $status,
      priority: $priority,
      dueDate: $dueDate
    ) {
      id
      title
      description
      status
      priority
      dueDate
    }
  }
`;

const TaskForm = ({ projectId, closeForm }) => {
  const [formData, setFormData] = useState({
    title: '',
    status: 'TODO',
    priority: 'Medium',
    dueDate: '',
  });

  const [addTask, { error, loading }] = useMutation(ADD_TASK, {
    variables: {
      projectId,
      title: formData.title,
      status: formData.status,
      priority: formData.priority,
      dueDate: formData.dueDate,
    },
    onCompleted: () => {
      alert('Task added successfully!');
      closeForm();  // Close the form after successful submission
    },
    onError: () => {
      alert('Error adding task');
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask();
  };

  return (
    <div className="task-form">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="TODO">TODO</option>
            <option value="In Progress">In Progress</option>
            <option value="Review">Review</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" disabled={loading}>
            {loading ? 'Adding Task...' : 'Add Task'}
          </button>
        </div>
        {error && <p className="error-message">Error adding task: {error.message}</p>}
      </form>
    </div>
  );
};

export default TaskForm;
