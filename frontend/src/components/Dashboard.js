import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: ''
  });

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
    fetchOverdueTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOverdueTasks = async () => {
    try {
      const response = await axios.get('/api/tasks/overdue');
      setOverdueTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching overdue tasks:', error);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/tasks', formData);
      setTasks([response.data.task, ...tasks]);
      setFormData({ title: '', description: '', dueDate: '' });
      setShowAddForm(false);
      fetchOverdueTasks();
    } catch (error) {
      alert(error.response?.data?.message || 'Error adding task');
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/api/tasks/${editingTask._id}`, formData);
      setTasks(tasks.map(task => 
        task._id === editingTask._id ? response.data.task : task
      ));
      setFormData({ title: '', description: '', dueDate: '' });
      setEditingTask(null);
      fetchOverdueTasks();
    } catch (error) {
      alert(error.response?.data?.message || 'Error updating task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    // if (window.confirm('Are you sure you want to delete this task?')) {
    //   try {
    //     await axios.delete(`/api/tasks/${taskId}`);
    //     setTasks(tasks.filter(task => task._id !== taskId));
    //     fetchOverdueTasks();
    //   } catch (error) {
    //     alert('Error deleting task');
    //   }
    // }
     await axios.delete(`/api/tasks/${taskId}`);
        setTasks(tasks.filter(task => task._id !== taskId));
        fetchOverdueTasks();
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate.split('T')[0]
    });
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setFormData({ title: '', description: '', dueDate: '' });
  };

  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusClass = (task) => {
    const daysRemaining = getDaysRemaining(task.dueDate);
    
    if (task.status === 'completed') return 'completed';
    if (daysRemaining < 0) return 'overdue';
    if (daysRemaining <= 5) return 'urgent';
    return 'normal';
  };

  const getStatusText = (task) => {
    const daysRemaining = getDaysRemaining(task.dueDate);
    
    if (task.status === 'completed') return 'Completed';
    if (daysRemaining < 0) return `Overdue by ${Math.abs(daysRemaining)} days`;
    if (daysRemaining === 0) return 'Due today';
    if (daysRemaining === 1) return 'Due tomorrow';
    return `Due in ${daysRemaining} days`;
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Task Tracker</h1>
        <div className="user-info">
          <span>Welcome, {user?.name}!</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="overdue-section">
          {overdueTasks.length > 0 && (
            <div className="overdue-tasks">
              <h3>⚠️ Overdue Tasks ({overdueTasks.length})</h3>
              {overdueTasks.map(task => (
                <div key={task._id} className={`task-card overdue`}>
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                  <div className="task-meta">
                    <span className="status overdue">Overdue by {Math.abs(getDaysRemaining(task.dueDate))} days</span>
                    <span className="due-date">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="tasks-section">
          <div className="tasks-header">
            <h2>My Tasks ({tasks.length})</h2>
            <button 
              onClick={() => setShowAddForm(true)} 
              className="add-task-btn"
            >
              + Add Task
            </button>
          </div>

          {(showAddForm || editingTask) && (
            <div className="task-form">
              <h3>{editingTask ? 'Edit Task' : 'Add New Task'}</h3>
              <form onSubmit={editingTask ? handleUpdateTask : handleAddTask}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                    placeholder="Task title"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    placeholder="Task description"
                  />
                </div>
                <div className="form-group">
                  <label>Due Date</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="save-btn">
                    {editingTask ? 'Update Task' : 'Add Task'}
                  </button>
                  <button 
                    type="button" 
                    onClick={editingTask ? cancelEdit : () => setShowAddForm(false)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="tasks-list">
            {tasks.length === 0 ? (
              <div className="no-tasks">
                <p>No tasks yet. Create your first task!</p>
              </div>
            ) : (
              tasks.map(task => (
                <div key={task._id} className={`task-card ${getStatusClass(task)}`}>
                  <div className="task-header">
                    <h4>{task.title}</h4>
                    <div className="task-actions">
                      <button 
                        onClick={() => handleEditClick(task)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteTask(task._id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="task-description">{task.description}</p>
                  <div className="task-meta">
                    <span className={`status ${getStatusClass(task)}`}>
                      {getStatusText(task)}
                    </span>
                    <span className="due-date">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 