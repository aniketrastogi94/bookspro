import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import nodemailer from 'nodemailer'
import sendgrid from 'nodemailer-sendgrid-transport'
import crypto from 'crypto'
import { OAuth2Client } from 'google-auth-library'
import bcrypt from 'bcryptjs';

const client=new OAuth2Client("403380080270-6rpdj7ll4gkvlrvi4s03imtk3e487nuo.apps.googleusercontent.com");

const transporter=nodemailer.createTransport(sendgrid({
  auth:{
    api_key:"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"
  }
}));


const ResetPassword=(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
      if(err) console.log(err);
      const token=buffer.toString("hex");
      const {email}=req.body;
      User.findOne({ email }).then((user)=>{
        if(!user) return res.status(422).json({errors:"User doesn't excist"});
        user.resetToken=token;
        user.expireToken=Date.now()+360000;
        user.save().then((result)=>{
          transporter.sendMail({
            to:user.email,
            from:"chamolirohit22@gmail.com",
            subject:"Reset Password",
               html:`
                 <p>You Requested for reset password</p>
                 <h5>Click on this link <a href="http://localhost:3000/reset/${token}" >Link</a>to reset your password</h5>
               `
          });
          return res.json({msg:"check your email"});
        })
      })
    })
}

const NewPassword=asyncHandler(async (req,res)=>{
  const {password,token}=req.body;
  User.findOneAndUpdate({resetToken:token}).then(user=>{
    if(!user) return res.status(422).json({error:"Try again session expired"});
        user.password=password;
        user.resetToken=undefined;
        user.expireToken=undefined;
        user.save().then((result)=>{
          return res.json({msg:"Password Updated Successfully,please head over to the login page"});
        })
      })
    })

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

const googleLogin=asyncHandler(async (req,res)=>{
  const {tokenId}=req.body;
  let response=await client.verifyIdToken({idToken:tokenId,audience:"403380080270-6rpdj7ll4gkvlrvi4s03imtk3e487nuo.apps.googleusercontent.com"});
  const {email,email_verified,name}=response.payload;
  if(email_verified){
    try {
      const user=await User.findOne({email});
      if(user){
        res.json({
          _id:user._id,
          name:user.name,
          email:user.email,
          isAdmin:user.isAdmin,
          token:generateToken(user._id)
        })
      }
      else{
        let password=email;
        const user=await User.create({
          name,
          email,
          password
        });
        if(user){
          res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
          })
        }else{
          res.status(400)
          throw new error('Invalid user data')
        }
      }
    } catch (err) {
      res.status(400)
      throw new error('Invalid user data')
    }
  }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  let { name, email, password } = req.body
  
  const userExists = await User.findOne({ email })
  console.log(password);
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
    transporter.sendMail({
      to:user.email,
      from:"chamolirohit22@gmail.com",
      subject:"Welcome to BuyMyBooks",
      html:"<h1>Welcome to the BuyMyBooks</h1>"
  }) 
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})
const registerAdmin = asyncHandler(async (req, res) => {
  let { name, email, password,isAdmin} = req.body

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
    isAdmin
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
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
  NewPassword,
  registerAdmin
};
