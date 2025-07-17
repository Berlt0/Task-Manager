import { useState, useEffect } from 'preact/hooks';
import { MdDelete } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import './app.css';

export function App() {
  const [inputTask, setInputTask] = useState("");
  const [editedText,setEditedText] = useState("")
  const [editedTaskId,setEditTaskId] = useState(null);
  const [submittedTask, setSubmittedTask] = useState([]); 
  const [selectDeletedTaskId,setSelectDeletedTaskId] = useState(null)

  useEffect(() => {
    fetchData()
  },[])


  const fetchData = async () => {

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

  const buttonClick = async () => {
    if (!inputTask) return
    
    try{

      const insertData = await axios.post('http://localhost:3000/tasks',{
        task: inputTask
      });

      console.log(insertData.data);
      setInputTask(""); 
      fetchData();

    }catch(error){
      console.error('Something went wrong. ', error)
    }
  
  };

  const deleteTask = async (id) => {

    setSelectDeletedTaskId(id)

    setTimeout( async () => {
      try{
        const response = await axios.delete(`http://localhost:3000/tasks/${id}`);
        
        fetchData();
        setSelectDeletedTaskId(null)

      }catch(error){
        console.error('Something went wrong.',error)
      }
    },500)
  }

  const updateTask = (id) => {
    setEditTaskId(id)
    const currentTask = submittedTask.find((task) => task.id === id )
    setEditedText(currentTask.task); 
  }

  const editRequest = async (id) => {
    try{
      const response = await axios.put(`http://localhost:3000/tasks/${id}`, {
        task: editedText
      })

      setEditTaskId(null)
      setEditedText("")
      fetchData()

    }catch(error){
      console.error('Something Went Wrong.', err)
    }
  }

  return (
    <div className='main'>
      <div className='second'>
        <h2 className='task_manager'>Task Manager</h2>
        
        <input
          className='task-input'
          placeholder="Add new task"
          value={inputTask}
          onChange={getValue}
          onKeyDown={(e) => (e.key === 'Enter') ? buttonClick() : ''}
        />

        <button className='add-btn' onClick={buttonClick}>
          Add
        </button>

        <p className='noTask'>Task: {submittedTask.length}</p>

        { submittedTask.length === 0 ?(
        <h2 className='noTaskRemaining'>No tasks remaining.</h2>
      ):(

        <div className='tasks'>
          {submittedTask.map((task,index) => (

            <div className={`task-item ${selectDeletedTaskId === task.id ? 'deleting' : ''}`} key={task.id}>

              <div className='task'>
                  {editedTaskId === task.id ? (
                      <input className='edit' value={editedText} onChange={(e) => setEditedText(e.target.value)} onKeyDown={(e) => (e.key === 'Enter') ? editRequest(task.id) : ''}/>
                    ) : (
                      <p className='ttext'>{task.task}</p>
                    )}
              </div>

              <div className='icons'>
                { editedTaskId === task.id ? (
                  <>
                    <FaCheck className="save-icon" onClick={() => editRequest(task.id)}/>
                    <MdCancel className="cancel-icon" onClick={() => setEditTaskId(null)}/>
                  </>
                ):(
                  
                     <FaEdit className="edit-icon" onClick={() => updateTask(task.id)}/>
                
                )}
                <MdDelete className="delete-icon" onClick={() => deleteTask(task.id)}/>
              </div>

            </div>
         
         ))}
        </div>
    )}
     </div>
  </div>
  );
}
