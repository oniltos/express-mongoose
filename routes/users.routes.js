import { Router } from 'express'
import User from '../models/User.model.js'

const userRouter = Router()

userRouter.get('/', async (req, res, next) => {
    try {
        const users = await User.find({}, '-_id');
        res.status(200).json(users)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server Error'})
    }
})


userRouter.post('/', async (req, res, next) => {
    try {
        const newUser = await User.create(req.body)
        res.status(201).json(newUser)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server Error - Error creating user'})
    }
})

userRouter.put('/:id', async (req, res, next) => {
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

userRouter.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server Error - Error getting user'})
    }
})

userRouter.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        await User.findByIdAndDelete(id)
        res.status(204).json()
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server Error - Error deleting user'})
    }
})

export default userRouter
