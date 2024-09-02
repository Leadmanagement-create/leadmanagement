import express from 'express'
import {
  createUserHandler,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginHandler,
} from '../controller/userController.js'
import { auth } from '../middlewares/authMiddleware.js'
const role = ['admin','user'];
const router = express.Router()
router.post('/', createUserHandler)
router.post('/login', loginHandler)
router.get('/', auth(role), getAllUsers)
router.get('/:id', auth(role), getUserById)
router.put('/:id', auth(role), updateUser)
router.delete('/:id', auth(role), deleteUser)

export default router

