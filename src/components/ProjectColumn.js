import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import '../styles/Column.css';

const DELETE_PROJECT = gql`
  mutation DeleteProject($projectId: ID!) {
    deleteProject(projectId: $projectId) {
      id
      name
      description
    }
  }
`;

const ProjectColumn = ({ id, title, description, createdAt, members }) => {
  const navigate = useNavigate();

  const clickEvent = () => navigate(`/project/${id}`);

  const formatDate = (timestamp) => {
    const numericTimestamp = Number(timestamp);
    const validTimestamp = numericTimestamp > 9999999999 ? numericTimestamp : numericTimestamp * 1000;
    return new Date(validTimestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const [deleteProject, { error, loading }] = useMutation(DELETE_PROJECT, {
    variables: { projectId: id },
    onCompleted: () => {
        alert("Project deleted successfully!");
        navigate("/"); // Redirect to home after deletion
    },
    onError: (error) => {
        alert("Error deleting project: " + error.message);
    },
  });

  const handleDelete = () => {
      if (window.confirm("Are you sure you want to delete this project?")) {
          deleteProject();
      }
  };

  return (
    <div className="column" onClick={clickEvent}>
      <div className="column-header">
        <h2>{title}</h2>
        <p className="column-description">{description}</p>
      </div>

      <div className="column-details">
        <h5>Created on: {formatDate(createdAt)}</h5>
        <div className="column-members">
          <h4>Team Members:</h4>
          {Array.isArray(members) && members.length > 0 ? (
            <ul className="members-list">
              {members.map((member) => (
                <li key={member.id} className="member">
                  <span className="member-name">{member.name}</span>
                  <span className="member-role">{member.role}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No team members assigned</p>
          )}
        </div>
      </div>
      
      <div className="column-footer">
      <button className="deleteButton" onClick={handleDelete} disabled={loading}>
      {loading ? 'Deleting...' : 'Delete'}
      </button>
      </div>

    </div>
  );
};

export default ProjectColumn;
