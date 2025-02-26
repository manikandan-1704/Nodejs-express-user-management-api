const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.findAll({where: {user_id: req.user.id}});
    res.status(200).json({message: "All Contacts fetched successfully!" , contacts});
});

const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({ name, email, phone, user_id: req.user.id })
    res.status(200).json({ message: "Contact Created Successfully", contact });
});

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json({ message: "Contact fetched successfully!", contact });
});

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("You don't have permission to update this contact");
    }
    await Contact.update(
        req.body,
        {
            where: { id: req.params.id }
        });
    const updatedContact = await Contact.findByPk(req.params.id);


    res.status(200).json({ message: "Contact Updated Successfully", updatedContact })
});

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id !== req.user.id){
        res.status(403);
        throw new Error("You don't have permission to delete this contact");
    }
    await Contact.destroy({
        where: {id: req.params.id}
    })
    res.status(200).json({ message: "Contact Deleted Successfully!" });
});

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };