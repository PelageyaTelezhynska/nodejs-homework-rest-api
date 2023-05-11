const {Schema, model} = require('mongoose')
const Joi = require('joi')
const {handleMongooseError} = require('../helpers')

const status = ["starter", "pro", "business"];

const userSchema = new Schema({
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: status,
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: String,
  }, {versionKey: false, timestamps: true})

const registerSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string().valid(...status),
  })

  const loginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string().valid(...status),
    // token: Joi.string()
  })

  const updSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid(...status),
  })

  const schemas = {
    registerSchema,
    loginSchema,
    updSubscriptionSchema
}

userSchema.post('save', handleMongooseError)

const User = model('user', userSchema)



module.exports = {
    User,
    schemas
}