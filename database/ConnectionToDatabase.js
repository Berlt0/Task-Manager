import mysql from 'mysql';

 const database = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'lezgosqllearn21',
    database: 'task_manager',
})

database.connect((err) =>{

    if(err){
        console.log(`Something went wrong ${err.message}`)

    }

    console.log(`Database successfully connected.`)

})




export default database;
