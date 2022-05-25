// const { createError } = require("../../helpers");

// const { Contact } = require("../../models/contact")

// const updateContact = async (req, res) => {
//   const { contactId } = req.params;
//   const contact = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
//   if (!contact) {
//     throw createError(`Contact with id=${contactId} not found`);
//   }
//   res.json({
//     status: "success",
//     code: 200,
//     data: {
//       contact,
//     },
//   });
// };
// module.exports = updateContact;