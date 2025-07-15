import express from 'express';
import cors from 'cors'
import database  from '../database/ConnectionToDatabase.js';

const app = express()
const PORT = 3000;

app.use(express.json())
app.use(cors())

app.get('/tasks', (req,res) => {

    try{
    const query = 'SELECT * FROM tasks';

    database.query(query, (err,result) => {

    if(err){
        return res.status(500).json({success:false,message:'Failed to retrieve data.'})
    }

    res.status(200).json({success:true, data:result})

    });
    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:'Something went wrong in the server.'})
    }

})


app.listen(PORT, () => console.log(`Server is running in localhost:${PORT}`))