import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import ProjectColumn from './ProjectColumn';
import '../styles/Board.css'

const GET_PROJECTS = gql`
  query GetProjects {
    getProjects {
      id
      name
      description
      createdAt
      team {
        name
        email
        role
      }       
    }
  }
`;

const DashBoard = () => {
   const navigate = useNavigate();
  const handleAddProject = () => {
    navigate(`/project/add-project`); // Navigate to TaskForm page
  };

  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="board">
      <h1>Project Management Board</h1>
      <div className="columns">
        {data.getProjects.map((project) => (
          <ProjectColumn 
            id={project.id} 
            title={project.name} 
            description={project.description} 
            createdAt={project.createdAt} 
            members={project.team}/>
        ))}
      </div>
      <button className='addButton' onClick={handleAddProject}> Add New Project</button>
    </div>
  );
};

export default DashBoard;
