import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'

export const getUserByEmail = async (email) => {
  return User.findOne({ email })
}

export const createUser = async (userBody) => {
  return User.create(userBody)
}

export const loginUserWithEmailAndPassword = async (email, password) => {
  try {
    const user = await getUserByEmail(email)

    if (!user) {
      return false
    }

    if (user.email !== email) {
      console.log('Email does not match')
      return false
    }

    const passwordMatch = await bcrypt.compare(password, user.password)


    if (!passwordMatch) {
      return false
    }

    return user
  } catch (error) {
    console.error('Error in loginUserWithEmailAndPassword:', error)
    throw error
  }
}
