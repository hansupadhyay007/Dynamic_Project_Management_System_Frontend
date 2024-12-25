import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import '../styles/AddProjectForm.css';

const ADD_PROJECT = gql`
  mutation AddProject($name: String!, $description: String!, $createdAt: String!) {
    addProject(name: $name, description: $description, createdAt: $createdAt) {
      id
      name
      description
      createdAt
    }
  }
`;

const AddProjectForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    createdAt: '',
  });

  const navigate = useNavigate();

  const [addProject, { loading, error }] = useMutation(ADD_PROJECT, {
    onCompleted: () => {
      alert('Project added successfully!');
      navigate(`/`); // Redirect to Dashboard
    },
    onError: () => {
        alert('Error adding task');
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProject({ variables: formData });
  };

  return (
    <div className="add-project-form">
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Project Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Created At:</label>
          <input
            type="date"
            name="createdAt"
            value={formData.createdAt}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding Project...' : 'Add Project'}
        </button>
        {error && <p className="error-message">Error adding project: {error.message}</p>}
      </form>
    </div>
  );
};

export default AddProjectForm;
