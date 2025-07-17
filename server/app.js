import express from 'express';
import cors from 'cors'
import database  from '../database/ConnectionToDatabase.js';

const app = express()
const PORT = 3000;

app.use(express.json())
app.use(cors())

app.get('/tasks', (req,res) => {

    const query = 'SELECT * FROM tasks';


    database.query(query, (err,result) => {

    if(err) return res.status(500).json({success:false,message:'Failed to retrieve data.'})
    
    res.status(200).json({success:true, data:result})

    });

})


app.post('/tasks', (req,res) => {

    const { task } = req.body;
    const  query  = 'INSERT INTO tasks (task) VALUES (?)';

    if(!task) return res.status(400).json({success:false,message: 'Task is required'})

    database.query(query,[task],(err,result) => {

    if(err) return res.status(500).json({success:false,message: 'Failed to add tasks'})

    res.status(201).json({success:true,message:'Successfully added.', taskId:result.InsertId})

    })


})

app.delete('/tasks/:id', (req,res) => {

    const {id} = req.params;   
    const query =  'DELETE FROM tasks WHERE id = ?'

    database.query(query,[id],(err,result) => {
        if(err) return res.status(500).json({success:false, message: 'Something went wrong.'})
        
        res.status(204).json({success:true,message: 'Task has been deleted'})

    })

})


app.listen(PORT, () => console.log(`Server is running in localhost:${PORT}`))