import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import TaskColumn from './TaskColumn';
import '../styles/Board.css';

const GET_PROJECT_DETAILS = gql`
  query GetProjectById($projectId: ID!) {
    getProjectById(projectId: $projectId) {
      id
      name
    }
  }
`;

const GET_TASKS = gql`
  query getTasks($projectId: ID!) {
    getTasksByProject(projectId: $projectId) {
      id
      title
      description
      priority
      status
      dueDate
      assignee {
        name
        role
        email
      }
    }
  }
`;

const TaskBoard = () => {
  const { id: projectId } = useParams(); // Get projectId from URL
  
  const navigate = useNavigate();
  const handleAddTask = () => {
    navigate(`/project/${projectId}/add-task`); // Navigate to TaskForm page
  };

  const { loading: projectloading, error: projecterror, data: projectdata } = useQuery(GET_PROJECT_DETAILS, {
    variables: { projectId },
  });

  const { loading, error, data } = useQuery(GET_TASKS, {
    variables: { projectId },
  });

  if (loading || projectloading) return <p>Loading...</p>;
  if (error || projecterror) return <p>Error: {error.message}</p>;

  const projectName = projectdata?.getProjectById?.name;
  console.log(projectName);
  
  // Ensure tasks are safely populated and not undefined
  const tasks = data?.getTasksByProject || [];
  const todoTasks = tasks.filter(task => task?.status === 'TODO');
  const inProgressTasks = tasks.filter(task => task?.status === 'In Progress');
  const reviewTasks = tasks.filter(task => task?.status === 'Review');
  const doneTasks = tasks.filter(task => task?.status === 'Done');

  return (
    <div className="board">
      <h1>Project Name: {projectName || 'Unknown'}</h1>
      <div className="columns">
        <TaskColumn title="TODO" tasks={todoTasks} />
        <TaskColumn title="In Progress" tasks={inProgressTasks} />
        <TaskColumn title="Review" tasks={reviewTasks} />
        <TaskColumn title="Done" tasks={doneTasks} />
      </div>
      <button className='addButton' onClick={handleAddTask}>Add New Task</button>
    </div>
  );
};

export default TaskBoard;