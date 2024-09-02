import {
  getUserByEmail,
  createUser,
  loginUserWithEmailAndPassword,
} from '../services/user.service.js'
import { generateAuthTokens } from '../services/token.service.js'
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'
const createUserHandler = async (req, res) => {
  try {
    let userData = req.body
    const { email } = userData

    // const userExist = await User.findOne({ email })
    const userExist = await getUserByEmail(email)
    if (userExist) {
      return res.status(400).json({ message: 'User already exists.' })
    } else {
      const saltRounds = 10
      const salt = await bcrypt.genSalt(saltRounds)
      const hashedPassword = await bcrypt.hash(userData.password, salt)
      userData = {
        ...userData,
        password: hashedPassword,
      }
      const savedUser = await createUser(userData)
      res.status(200).json({
        message: 'User created successfully',
       Data: savedUser})
    }
  } catch (error) {
    res.status(500).json({
     message: error.message
    })
  }
}


const getAllUsers = async (req, res) => {
  try {
    const { role } = req.query;

    let query = { status: true };
    if (role) {
      query.role = role; 
    }

    const users = await User.find(query);
    
    console.log(users);

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found.' });
    }

    res.status(200).json({
      message: 'Users retrieved successfully',
      data: users,
    });
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal Server Error. ' + error.message });
  }
};

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await loginUserWithEmailAndPassword(email, password)
    if (user) {
      const tokens = await generateAuthTokens(user)
      res.status(200).json({ message: 'Login Successfully!!', user, tokens })
    } else {
      res.status(400).json({ message: 'Incorrect email or password' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error.' + error })
  }
}

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({
      message:'User Found Successgully',
      Data:user
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message })
  }
}

const updateUser = async (req, res) => {
  try {
    const id = req.params.id
    const userExists = await User.findOne({ _id: id })
    if (!userExists) {
      return res.status(404).json({ message: 'User not found.' })
    }
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true })
    res.status(200).json({
      message:'User Update Successfully',
      Data:updatedUser
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error.' + error })
  }
}

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExists = await User.findOne({ _id: id });

    if (!userExists) {
      return res.status(404).json({ message: 'User not found.' });
    }

    await User.findByIdAndUpdate(id, {
      status: false,
    });

    res.status(200).json({ message: 'User marked as deleted successfully.',User});
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error.' + error });
  }
}

export { createUserHandler, getAllUsers, getUserById, updateUser, deleteUser, loginHandler }
