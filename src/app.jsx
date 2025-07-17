import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import './app.css';

export function App() {
  const [inputTask, setInputTask] = useState("");
  const [submittedTask, setSubmittedTask] = useState([]); 
  
  

  const fetchData = async() => {

    try{
      const response = await axios.get('http://localhost:3000/tasks')
      setSubmittedTask(response.data.data);
      console.log(response.data.data)


    }catch(error){
      console.error('Something went wrong.', error)
    }
  }

  
  const getValue = (e) => {
    setInputTask(e.target.value);
  };

  const buttonClick = () => {
    if (!inputTask) return
    
    setSubmittedTask([...submittedTask,inputTask]); 
    setTask(""); 
  };

useEffect(() => {
    fetchData()
  },[])


  return (
    <div className='main'>
      <div className='second'>
        <h2 className='task_manager'>Task Manager</h2>

        <input
          className='task-input'
          placeholder="Add new task"
          value={inputTask}
          onChange={getValue}
        />

        <button className='add-btn' onClick={buttonClick}>
          Add
        </button>

        <p className='noTask'>Task: {submittedTask.length}</p>

        <div className='tasks'>
          {submittedTask.map((task,index) => (
          
              <p className='ttext' key={index}>{task.task}</p>
            
          ))}
        </div>

      </div>
      
    </div>
  );
}
