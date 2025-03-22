import React, { useState, useEffect } from 'react';
import Header from '../other/Header';
import TaskListNumbers from '../other/TaskListNumbers';
import TaskList from '../TaskList/TaskList';

const EmployeeDashboard = (props) => {
  // Load tasks from localStorage or initialize with unique IDs
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    let loadedTasks = savedTasks ? JSON.parse(savedTasks) : props.data.tasks;

    // Ensure every task has a unique ID
    loadedTasks = loadedTasks.map((task, index) => ({
      ...task,
      id: task.id ?? Date.now() + index, // Assign unique ID if missing
    }));

    console.log(" Loaded tasks with ensured IDs:", loadedTasks);
    return loadedTasks;
  });

  // Load task counts from localStorage or initialize
  const [taskCounts, setTaskCounts] = useState(() => {
    const savedCounts = localStorage.getItem('taskCounts');
    return savedCounts ? JSON.parse(savedCounts) : props.data.taskCounts;
  });

  // Save tasks to localStorage when they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('taskCounts', JSON.stringify(taskCounts));
  }, [tasks, taskCounts]);

  const updateTaskStatus = (taskId, newStatus) => {
    console.log(" Updating Task ID:", taskId);

    const updatedTasks = tasks.map(task => 
      task.id === taskId
        ? { 
            ...task, 
            newTask: false, 
            active: newStatus === 'accepted', 
            completed: newStatus === 'completed', 
            failed: newStatus === 'failed' 
          }
        : task
    );

    console.log(" Updated tasks:", updatedTasks);
    setTasks([...updatedTasks]); // Ensure state change is detected

    // Update task counts
    const newTaskCounts = {
      newTask: updatedTasks.filter(task => task.newTask).length,
      completed: updatedTasks.filter(task => task.completed).length,
      active: updatedTasks.filter(task => task.active).length,
      failed: updatedTasks.filter(task => task.failed).length,
    };

    console.log(" Updated task counts:", newTaskCounts);
    setTaskCounts({ ...newTaskCounts });

    // Save to localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    localStorage.setItem('taskCounts', JSON.stringify(newTaskCounts));
  };

  return (
    <div className='p-10 bg-[#1C1C1C] h-screen'>
        <Header changeUser={props.changeUser} data={props.data}/>
        <TaskListNumbers taskCounts={taskCounts} />
        <TaskList tasks={tasks} updateTaskStatus={updateTaskStatus}/>
    </div>
  );
};

export default EmployeeDashboard;
