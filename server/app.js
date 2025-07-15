import express from 'express';
import database  from '../database/ConnectionToDatabase.js';

const app = express()
const PORT = 3000;


app.use(express.json())


app.listen(PORT, () => console.log(`Server is running in localhost:${PORT}`))