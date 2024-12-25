import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashBoard from './components/DashBoard';
import TaskBoard from './components/TaskBoard';
import TaskForm from './components/TaskForm'
import './styles/Board.css';
import AddProjectForm from './components/AddProjectForm';

function App() {
  return (
    <Router>
      <Routes>

        <Route path='/' element={
          <div className="App">
            <DashBoard />
          </div>
        } />

        <Route path='/project/add-project' element={<AddProjectForm />} />

        <Route path='/project/:id' element={<TaskBoard />} />

        <Route path="/project/:id/add-task" element={<TaskForm />} />

      </Routes>
    </Router>    
  );
}

export default App;
