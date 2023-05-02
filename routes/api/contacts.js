const express = require('express');

const {listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact, 
  updateFavorite} = require('../../controllers/contacts');

  const {validateBody, isValidId} = require('../../middlewars');
  const {schemas} = require('../../models/contact')

const router = express.Router()

router.get('/', listContacts)

router.get('/:id', isValidId, getContactById)

router.post('/', validateBody(schemas.addContactSchema), addContact)

router.delete('/:id', isValidId, removeContact)

router.put('/:id', isValidId, validateBody(schemas.updContactSchema), updateContact)

router.patch('/:id/favorite', isValidId, validateBody(schemas.updFavoriteSchema), updateFavorite)

module.exports = router
