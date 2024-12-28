import express from 'express';
import connectDB from './db.js';
import apps from "./routes/app.js"
import cors from 'cors';

const app = express();
app.use(cors());

connectDB();

app.use(express.json());

app.use('/data', apps);

app.get('/', (req, res) => {
    res.send('Hello from MongoDB Atlas!');
});


app.listen(3001, () => {
    console.log("Server is running on port");
});
