import React, { useState } from 'react';

const NewTask = ({ data, updateTaskStatus }) => {
  const [isAccepted, setIsAccepted] = useState(false);

  const handleAcceptTask = () => {
    updateTaskStatus(data.id, 'accepted');
    setIsAccepted(true); // Change UI to show "Mark as Completed" & "Mark as Failed"
  };

  return (
    <div className="flex-shrink-0 h-full w-[300px] p-5 bg-green-400 rounded-xl">
      <div className='flex justify-between items-center'> 
        <h3 className="bg red-600 text-sm px-3 py-1 rounded">{data.category}</h3>
        <h4 className='text-sm'>{data.taskDate}</h4>
      </div>
      <h2 className="mt-5 text-2xl font-semibold">{data.taskTitle}</h2>
      <p className='text-sm mt-2'>{data.taskDescription}</p>
      <div className='mt-6'>
        {!isAccepted ? (
          <button 
            onClick={handleAcceptTask} 
            className='bg-blue-500 rounded font-medium py-1 px-2 text-xs'
          >
            Accept Task
          </button>
        ) : (
          <div className='flex gap-2'>
            <button 
              onClick={() => updateTaskStatus(data.id, 'completed')} 
              className='bg-green-500 rounded font-medium py-1 px-2 text-xs'
            >
              Mark as Completed
            </button>
            <button 
              onClick={() => updateTaskStatus(data.id, 'failed')} 
              className='bg-red-500 rounded font-medium py-1 px-2 text-xs'
            >
              Mark as Failed
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewTask;