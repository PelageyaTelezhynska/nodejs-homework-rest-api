const {Contact} = require('../models/contact');
const {HttpError, ctrlWrapper } = require('../helpers');

const listContacts = async (req, res) => {
    const {_id: owner} = req.user;
    const {page = 1, limit = 20} = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({owner}, "-createAt, -updateAt", {skip, limit}).populate("owner", "email");
    res.json(result);
}

const getContactById = async (req, res) => {
    const { id } = req.params;
    const {_id: owner} = req.user;
    const result = await Contact.findOne({ _id: id, owner });
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
}

const addContact = async (req, res) => {
    const {_id: owner} = req.user;
    const result = await Contact.create({...req.body, owner});
    res.status(201).json(result);
}

const updateContact = async (req, res) => {
    const { id } = req.params;
    const {_id: owner} = req.user;
      if(!req.body.name && !req.body.email && !req.body.phone) {
        throw HttpError(400, "missing fields");
      }

    const result = await Contact.findOneAndUpdate({_id: id, owner}, req.body, {new: true});
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);  
}

const removeContact = async (req, res) => {
    const { id } = req.params;
    const {_id: owner} = req.user;
    const result = await Contact.findOneAndRemove({_id: id, owner});
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json({
        message: "Delete success"
    })
}

const updateStatusContact = async (req, res) => {
    const { id } = req.params;
    const {_id: owner} = req.user;
    if(!req.body.favorite) {
        throw HttpError(400, "missing field favorite");
      }
    
    const result = await Contact.findOneAndUpdate({_id: id, owner}, req.body, {new: true});
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);  
}

module.exports = {
   listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContact: ctrlWrapper(updateContact),
    removeContact: ctrlWrapper(removeContact),
    updateStatusContact: ctrlWrapper(updateStatusContact)
}

