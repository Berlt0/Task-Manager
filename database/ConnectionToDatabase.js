import mysql from 'mysql';
import dotenv from'dotenv';
dotenv.config();

 const database = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
})

database.connect((err) =>{

    if(err){
        console.log(`Something went wrong ${err.message}`)

    }

    console.log(`Database successfully connected.`)

})




export default database;
