import React from 'react'
import Header from '../other/Header'
import TaskListNumbers from '../other/TaskListNumbers'
import TaskList from '../TaskList/TaskList'
import { useState } from 'react'

const EmployeeDashboard = (props) => {

  const [tasks, setTasks] = useState(
    props.data.tasks.map((task, index) => ({ ...task, id: index + 1 })) // Assign unique IDs
  );
  
  const [taskCounts, setTaskCounts] = useState(props.data.taskCounts);// Use state here

  const updateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        if (newStatus === 'accepted') {
          return { ...task, newTask: false, active: true }; // Mark as active
        } else if (newStatus === 'completed') {
          return { ...task, newTask: false, active: false, completed: true }; // Mark as completed
        } else if (newStatus === 'failed') {
          return { ...task, newTask: false, active: false, failed: true }; // Mark as failed
        }
      }
      return task;
    });
  
    setTasks(updatedTasks);

    const newTaskCounts = {
      newTask: updatedTasks.filter(task => task.newTask).length,
      completed: updatedTasks.filter(task => task.completed).length,
      active: updatedTasks.filter(task => task.active).length,
      failed: updatedTasks.filter(task => task.failed).length,
    };

    setTaskCounts(newTaskCounts);
  };

  

  return (
    <div className='p-10 bg-[#1C1C1C] h-screen'>
        <Header changeUser={props.changeUser} data={props.data}/>
        <TaskListNumbers taskCounts={taskCounts} />
        <TaskList tasks={tasks}  updateTaskStatus={updateTaskStatus}/>
    </div>
  )
}

export default EmployeeDashboard