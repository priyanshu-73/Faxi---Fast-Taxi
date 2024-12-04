import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})