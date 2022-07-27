import dotenv from 'dotenv/config'
import mongoose from 'mongoose'

const MONGO_URI = `mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}`

const connectDb = async () => {
    const connection = await mongoose.connect(MONGO_URI)
    console.log(`Connected to mongo! Database: ${connection.connections[0].name}`)
}

export default connectDb