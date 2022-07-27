import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: props => `${props.value} is not a valid e-mail address`
        }
    },
    address: {
        street: String,
        number: String,
        complement: String,
        zipCode: String
    }
})

const User = mongoose.model('User', userSchema)
export default User