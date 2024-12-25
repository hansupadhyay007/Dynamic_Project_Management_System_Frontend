import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'TODO',
    priority: 'Medium',
    dueDate: '',
  });

  const { id: projectId } = useParams(); // Extract projectId from URL
  const navigate = useNavigate();
  
  const [addTask, { error, loading }] = useMutation(ADD_TASK, {
    variables: {
      projectId,
      title: formData.title,
      description: formData.description,
      status: formData.status,
      priority: formData.priority,
      dueDate: formData.dueDate,
    },
    onCompleted: () => {
      alert('Task added successfully!');
      navigate(`/project/${projectId}`); // Redirect to TaskBoard
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

  if (!projectId) {
    return <p>Error: Project ID is required to add a task.</p>;
  }

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
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
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
