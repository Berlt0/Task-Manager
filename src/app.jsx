import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import './app.css';

export function App() {
  const [task, setTask] = useState("");
  const [NumberTask, setNumberTask] = useState(0);
  const [submittedTask, setSubmittedTask] = useState([]); 
  
  setNumberTask(submittedTask.length)

  const fetchData = async() => {

    try{
      const response = await axios.get('http://localhost:3000/tasks')
      setTask(response.data.data);


    }catch(error){
      console.log('Something went wrong.')
    }
  }

  useEffect(() => {
    fetchData()
  },[])

  const getValue = (e) => {
    setTask(e.target.value);
  };

  const buttonClick = () => {
    if (!task) return

    setSubmittedTask([...submittedTask,task]); 
    setTask(""); 
  };



  return (
    <div className='main'>
      <div className='second'>
        <h2 className='task_manager'>Task Manager</h2>

        <input
          className='task-input'
          placeholder="Add new task"
          value={task}
          onChange={getValue}
        />

        <button className='add-btn' onClick={buttonClick}>
          Add
        </button>

        <p className='noTask'>Task: {NumberTask}</p>

        <div className='tasks'>
          {submittedTask.map((task,index) => (
          
              <p className='ttext' key={index}>{task}</p>
            
          ))}
        </div>

      </div>
      
    </div>
  );
}
