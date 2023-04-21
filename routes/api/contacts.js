const express = require('express');

const {listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact} = require('../../controllers/contacts');

  const {validateBody} = require('../../middlewars');
  const schemas = require('../../schemas/contacts')


const router = express.Router()

router.get('/', listContacts)

router.get('/:id', getContactById)

router.post('/', validateBody(schemas.addSchema), addContact)

router.delete('/:id', removeContact)

router.put('/:id', validateBody(schemas.addSchema), updateContact)

module.exports = router
