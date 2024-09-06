import React, { useState, useEffect } from 'react';
import moment from 'moment'; 
import '../Todo.css';

// Main App Component
const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('low'); 
  const [editTaskId, setEditTaskId] = useState(null); 
  const [editTaskText, setEditTaskText] = useState(''); 
  const [editTaskPriority, setEditTaskPriority] = useState('low');
  const [view, setView] = useState('Today'); 
  const [selectedTask, setSelectedTask] = useState(null); 

  useEffect(() => {
    const storedTasks = sessionStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  const addTask = () => {
    if (newTask.trim()) {
      const newTaskObject = {
        id: tasks.length + 1, 
        text: newTask,
        date: moment().format('YYYY-MM-DD'), 
        completed: false,
        priority: newTaskPriority, 
      };
      setTasks([...tasks, newTaskObject]);
      setNewTask(''); 
      setNewTaskPriority('low'); 
    }
  };

  const startEditingTask = (task) => {
    setEditTaskId(task.id);
    setEditTaskText(task.text);
    setEditTaskPriority(task.priority); 
  };

  const saveEditedTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: editTaskText, priority: editTaskPriority } : task));
    setEditTaskId(null); 
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const getFilteredTasks = () => {
    const today = moment().format('YYYY-MM-DD'); 
    if (view === 'Today') return tasks.filter(task => task.date === today);
    if (view === 'Pending') return tasks.filter(task => moment(task.date).isAfter(moment()) && !task.completed);
    if (view === 'Overdue') return tasks.filter(task => moment(task.date).isBefore(moment()) && !task.completed);
    return tasks;
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    setSelectedTask(null);
  };

  const showTaskDetails = (task) => {
    setSelectedTask(task);
  };

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <div className="tabs">
        <button onClick={() => setView('Today')} className={view === 'Today' ? 'active' : ''}>Today</button>
        <button onClick={() => setView('Pending')} className={view === 'Pending' ? 'active' : ''}>Pending</button>
        <button onClick={() => setView('Overdue')} className={view === 'Overdue' ? 'active' : ''}>Overdue</button>
      </div>

      <div className="task-list">
        <h2>Tasks</h2>
        <ul>
          {getFilteredTasks().map(task => (
            <li key={task.id} className={`priority-${task.priority}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
              />
              {editTaskId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editTaskText}
                    onChange={(e) => setEditTaskText(e.target.value)}
                  />
                  <select 
                    value={editTaskPriority} 
                    onChange={(e) => setEditTaskPriority(e.target.value)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <button onClick={() => saveEditedTask(task.id)}>Save</button>
                </>
              ) : (
                <>
                  <span onClick={() => showTaskDetails(task)} style={{ cursor: 'pointer' }}>{task.text}</span>
                  <span>{task.date}</span>
                  <button onClick={() => startEditingTask(task)}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task..."
        />
        <select 
          value={newTaskPriority} 
          onChange={(e) => setNewTaskPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>

      {selectedTask && (
        <div className="task-details">
          <h3>Task Details</h3>
          <p><strong>Task:</strong> {selectedTask.text}</p>
          <p><strong>Date:</strong> {selectedTask.date}</p>
          <p><strong>Priority:</strong> {selectedTask.priority}</p>
          <p><strong>Completed:</strong> {selectedTask.completed ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
};

export default TodoApp;
