import express from 'express';
import connectDB from './db.js';
import apps from "./routes/app.js"
import cors from 'cors';
import { sessionConfig } from './middelWare/session.js';

const app = express();
const port = process.env.PORT || 3001

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

sessionConfig(app);
connectDB();

app.use(express.json());

app.use('/data', apps);

app.get('/', (req, res) => {
    res.send('Hello from MongoDB Atlas!');
});


app.listen(port, () => {
    console.log("Server is running on port");
});
