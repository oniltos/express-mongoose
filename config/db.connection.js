import mongoose from 'mongoose'
const MONGO_URI = 'mongodb://localhost/meCrud'

const connectDb = async () => {
    const connection = await mongoose.connect(MONGO_URI)
    console.log(`Connected to mongo! Database: ${connection.connections[0].name}`)
}

export default connectDb