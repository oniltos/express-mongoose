import express from 'express'
import connectDb from './config/db.connection.js'
import User from './models/User.model.js'

const PORT = 3001

const app = express()
connectDb()

app.use(express.json())

app.get('/users', async (req, res, next) => {
    try {
        const users = await User.find({}, '-_id');
        res.status(200).json(users)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server Error'})
    }
})

app.post('/users', async (req, res, next) => {
    try {
        const newUser = await User.create(req.body)
        res.status(201).json(newUser)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server Error - Error creating user'})
    }
})

app.put('/users/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const payload = req.body
        const updatedUser = await User.findOneAndUpdate({ _id: id}, payload, {new: true})
        res.status(200).json(updatedUser)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server Error - Error updating user'})
    }
})

app.get('/users/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server Error - Error getting user'})
    }
})

app.delete('/users/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        await User.findByIdAndDelete(id)
        res.status(204).json()
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server Error - Error deleting user'})
    }
})

app.listen(PORT, () => console.log('Server listening on port', PORT))