import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import root from './main.routes'

dotenv.config()

const app = express();

app.use(express.json())

app.use(express.urlencoded({ extended: true }));


app.use(cors());

app.get('/', (_, res) => {
    res.status(200).json({
        status: 200,
        message: "welcome to Nodejs server"
    })
})

// app.use("/api", root)

app.listen(process.env.PORT || 5000, () => {
    console.log(`SERVER IS WORKED ON PORT ${process.env.PORT}`)
})