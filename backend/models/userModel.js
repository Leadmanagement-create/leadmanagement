import mongoose from "mongoose";
import Joi from "joi";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        trim: true
    },
    last_name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,  
        required: true,
    },
    role: {
        type: String, 
        required: true,
        default: 'assignees'
    },
    status: {
        type: Boolean,
        default: true,
    }
});

const userValidationSchema = Joi.object({
    first_name: Joi.string().min(2).max(50).trim(),
    last_name: Joi.string().min(2).max(50).trim(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phoneNumber: Joi.string().length(10).pattern(/[0-9]{1}[0-9]{9}/).required(),
    role: Joi.string().optional(),
    status:Joi.boolean().optional()
}); 

userSchema.pre('save', function(next) {
    const user = this.toObject({ getters: false, virtuals: false });
    delete user._id;
    delete user.__v;

    const { error } = userValidationSchema.validate(user, { abortEarly: false });
    if (error) {
        next(new Error(error.details.map(err => err.message).join(', ')));  
    } else {
        next();
    }
});

const User = mongoose.model("users", userSchema);

export default User;
