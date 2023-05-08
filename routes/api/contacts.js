const express = require('express');

const {listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact, 
  updateStatusContact} = require('../../controllers/contacts');

  const {validateBody, isValidId, authenticate} = require('../../middlewars');
  const {schemas} = require('../../models/contact')

const router = express.Router()

router.get('/', authenticate, listContacts)

router.get('/:id', authenticate, isValidId, getContactById)

router.post('/', authenticate, validateBody(schemas.addContactSchema), addContact)

router.delete('/:id', authenticate, isValidId, removeContact)

router.put('/:id', authenticate, isValidId, validateBody(schemas.updContactSchema), updateContact)

router.patch('/:id/favorite', authenticate, isValidId, validateBody(schemas.updFavoriteSchema), updateStatusContact)

module.exports = router
