import React from 'react';
import { useMutation, gql } from '@apollo/client';
import '../styles/Card.css';

// GraphQL Mutation to update task status
const UPDATE_TASK_STATUS = gql`
  mutation updateTaskStatus($taskId: ID!, $status: String!) {
    updateTaskStatus(taskId: $taskId, status: $status) {
      id
      status
    }
  }
`;

const formatDate = (timestamp) => {
  const numericTimestamp = Number(timestamp);
  const validTimestamp = numericTimestamp > 9999999999 ? numericTimestamp : numericTimestamp * 1000;
  return new Date(validTimestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const TaskCard = ({ task }) => {
  // useMutation hook for updating task status
  const [updateTaskStatus] = useMutation(UPDATE_TASK_STATUS);

  // Function to handle status update
  const handleUpdateStatus = (newStatus) => {
    updateTaskStatus({
      variables: { taskId: task.id, status: newStatus },
    }).then(response => {
      console.log('Task updated:', response.data.updateTaskStatus);
    }).catch(err => {
      console.error('Error updating task status:', err);
    });
  };

  return (
    <div className="task-card">
      <h4><strong>{task.title}</strong></h4>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Due Date:</strong> {formatDate(task.dueDate)}</p>
      
      <div className="status-buttons">
        <button 
          onClick={() => handleUpdateStatus('TODO')} 
          disabled={task.status === 'TODO'}
        >
          TODO
        </button>
        <button 
          onClick={() => handleUpdateStatus('In Progress')} 
          disabled={task.status === 'In Progress'}
        >
          In Progress
        </button>
        <button 
          onClick={() => handleUpdateStatus('Review')} 
          disabled={task.status === 'Review'}
        >
          Review
        </button>
        <button 
          onClick={() => handleUpdateStatus('Done')} 
          disabled={task.status === 'Done'}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
