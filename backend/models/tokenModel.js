import mongoose from 'mongoose'
import Joi from 'joi'

const tokenSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  token: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  expires: {
    type: Date,
  },
  blacklisted: {
    type: Boolean,
    default: false,
  },
})

const tokenValidationSchema = Joi.object({
  userId: Joi.string().required(),
  token: Joi.string().required(),
  expires: Joi.date().required(),
})



const tokenModel = mongoose.model('Token', tokenSchema)
export { tokenModel, tokenValidationSchema }
