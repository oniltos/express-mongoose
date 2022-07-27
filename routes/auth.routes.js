import { Router } from 'express'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv/config'
import User from '../models/User.model.js'

const authRouter = Router()

authRouter.post('/sign-up', async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({ username })
        
        if(user)
            throw new Error('User already exists')
         
        const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS)
        const passwordHash = bcrypt.hashSync(password, salt)

        const newUser = await User.create({username, passwordHash})

        return res.status(201).json({username: newUser.username})

    } catch (err) {
        console.log(err)
        if(err.message === 'User already exists') {
            return res.status(409).json({ message: err.message})
        }
        res.status(500).json({message: 'Internal server error'})
    }
})

export default authRouter