import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import db from './db/db.js';
import userRouter from './routes/user.routes.js';

dotenv.config();

db(process.env.MONGO_URI);

const app = express();

const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Routes
app.use('/api/users', userRouter)

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})