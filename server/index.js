import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose';
import cors from 'cors';
import { usersRoute } from './routes/usersRoute.js';
import { todosRoute } from './routes/todosRoute.js';
import { authRoute } from './routes/authRoute.js';
const port = process.env.PORT || 5000;
const MONGO_DB_URL = process.env.MONGO_DB_URL;

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type']
}))
app.get('/', (req, res) => {
  return res.status(200).send(':)')
})

app.use('/users', usersRoute)
app.use('/todos',todosRoute)
app.use('/auth',authRoute)


mongoose.connect(MONGO_DB_URL).then(() => {
  console.log('DB connection is up');
  app.listen(port, () => console.log(`App is listening to port: ${port}`))
}).catch((err) => {
  console.log(err.message)
})
