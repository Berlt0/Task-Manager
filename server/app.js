import express from 'express';
import cors from 'cors'
import database  from '../database/ConnectionToDatabase.js';
import verifyToken from '../middleware/verifyToken.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const app = express()
const PORT = 3000;
const SECURITY_KEY = process.env.SECURITY_KEY;

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend origin
  credentials: true
}))

app.use(cookieParser());



app.get('/tasks', verifyToken, (req,res) => {

    const query = 'SELECT * FROM tasks';


    database.query(query, (err,result) => {

    if(err) return res.status(500).json({success:false,message:'Failed to retrieve data.'})
    
    res.status(200).json({success:true, data:result})

    });

})


app.post('/tasks', verifyToken, (req,res) => {

    const { task } = req.body;
    const  query  = 'INSERT INTO tasks (task) VALUES (?)';

    if(!task) return res.status(400).json({success:false,message: 'Task is required'})

    database.query(query,[task],(err,result) => {

    if(err) return res.status(500).json({success:false,message: 'Failed to add tasks'})

    res.status(201).json({success:true,message:'Successfully added.', taskId:result.InsertId})

    })


})

app.delete('/tasks/:id',  verifyToken,(req,res) => {

    const {id} = req.params;   
    const query =  'DELETE FROM tasks WHERE id = ?'

    database.query(query,[id],(err,result) => {
        if(err) return res.status(500).json({success:false, message: 'Something went wrong.'})
        
        res.status(204).json({success:true,message: 'Task has been deleted'})

    })

})


app.put('/tasks/:id',verifyToken,(req,res) => {

    const {id} = req.params;
    const {task} =req.body;
    const query = 'UPDATE tasks SET task = ? WHERE id = ?'

    database.query(query, [task,id], (err,result) =>{

        if(err) return res.status(500).json({success:true,message: 'Something went wrong.'})

        res.status(200).json({success: true,message: 'Successfully updated'})

    })

})


app.post('/login', (req, res) => {

    const {username, password} = req.body;

    if(!username || !password) {
        return res.status(400).json({success: false, message: 'Username and password are required.'});
    }

    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';

    database.query(sql,[username, password], (err, result) => {
        if(err) {
            console.log("Database Error")
            return res.status(500).json({success: false, message: 'Database error.'});
        }

        if(result.length === 0) {
            console.log("Invalid credentials")
            return res.status(401).json({success: false, message: 'Invalid username or password.'});
        }

        const user = result[0];
        const token = jwt.sign({username:user.username},SECURITY_KEY,{expiresIn: '1h'});

         res.cookie('token', token, {
            httpOnly: true,
            secure: false, // set to true if using HTTPS
            sameSite: 'Lax',
            maxAge: 60 * 60 * 1000 // 1 hour
            });

        console.log("Login successful")
        res.status(200).json({success: true, message: 'Login successful.', user: token});
    

    })
})

   app.get('/me', (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Not logged in' });

    jwt.verify(token, SECURITY_KEY, (err, user) => { 
        if (err) return res.status(403).json({ message: 'Invalid token' });
        res.json({ user });
    });
});


app.post('/logout', (req, res) => {
    res.clearCookie('token',{
        httpOnly: true,
        secure: false, 

    });
    res.status(200).json({ success: true, message: 'Logged out successfully' });
})


app.listen(PORT, () => console.log(`Server is running in localhost:${PORT}`))