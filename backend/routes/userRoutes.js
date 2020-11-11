import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  googleLogin,
  ResetPassword,
  registerAdmin,
  NewPassword
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'


router
  .route('/reset')
  .post(ResetPassword);
router
  .route('/')
  .post(registerUser)
  .get(protect, admin, getUsers)
router
  .post('/login', authUser)
router
  .post('/loginWithGoogle',googleLogin);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
router
  .route('/admin')
  .post(registerAdmin);
router.route('/newpassword').post(NewPassword);

export default router
