import dotenv from 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDb from './config/db.connection.js'
import User from './models/User.model.js'
import userRouter from './routes/users.routes.js'
import booksRouter from './routes/books.routes.js'
import authRouter from './routes/auth.routes.js'

const PORT = process.env.EXPRESS_PORT

const app = express()
connectDb()

app.use(express.json())
app.use(cors())

app.use('/users', userRouter)
app.use('/books', booksRouter)
app.use(authRouter)

app.listen(PORT, () => console.log('Server listening on port', PORT))