// const { createError } = require("../../helpers");

// const { Contact } = require("../../models/contact")

// const getContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const contact = await Contact.findById(contactId, "-createdAt -updatedAt");
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
// module.exports = getContactById;