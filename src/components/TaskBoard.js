import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import TaskColumn from './TaskColumn';
import '../styles/Board.css';

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

  const { loading, error, data } = useQuery(GET_TASKS, {
    variables: { projectId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Ensure tasks are safely populated and not undefined
  const tasks = data?.getTasksByProject || [];
  const todoTasks = tasks.filter(task => task?.status === 'TODO');
  const inProgressTasks = tasks.filter(task => task?.status === 'In Progress');
  const reviewTasks = tasks.filter(task => task?.status === 'Review');
  const doneTasks = tasks.filter(task => task?.status === 'Done');

  return (
    <div className="board">
      <h1>Project Management Board</h1>
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







// const GET_TASKS = gql`
//   query getTasks($projectId: ID!) {
//     getTasksByProject(projectId: $projectId) {
//       id
//       title
//       description
//       priority
//       status
//       dueDate
//       assignee {
//         name
//         role
//         email
//       }
//     }
//   }
// `;

// const TaskBoard = () => {
//   const { id: projectId } = useParams();
//   const { loading, error, data } = useQuery(GET_TASKS, {
//     variables: { projectId },
//   });
//   const [showForm, setShowForm] = useState(false);

//   const tasks = data?.getTasksByProject || [];

//   const toggleForm = () => setShowForm(!showForm);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div className="board">
//       <h1>Project Management Board</h1>
//       <div className="columns">
//         {tasks.map((task) => (
//           <TaskColumn key={task.id} task={task} status={task.status} />
//         ))}
//       </div>

//       <button className='addButton' onClick={toggleForm}>Add New Task</button>

//       {showForm && <TaskForm projectId={projectId} closeForm={toggleForm} />}
//     </div>
//   );
// };

// export default TaskBoard;
