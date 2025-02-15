const {Schema, model} = require('mongoose')
const Joi = require('joi')
const {handleMongooseError} = require('../helpers')

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
      favorite: {
        type: Boolean,
        default: false,
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      }
}, {versionKey: false, timestamps: true})

const addContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean()
  })
  
  const updContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.boolean()
  })

  const updFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
  })

  const schemas = {
    addContactSchema,
    updContactSchema,
    updFavoriteSchema,
}

contactSchema.post('save', handleMongooseError)

const Contact = model('contact', contactSchema)



module.exports = {
    Contact,
    schemas
}