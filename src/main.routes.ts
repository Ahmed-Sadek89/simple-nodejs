import express from 'express';
import AwnerRouters from './routes/Awner.routes'


const root = express()

root.use('/awner', AwnerRouters)


export default root