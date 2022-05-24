const fs = require('fs/promises');
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateBooks = async (contacts) => {
    const data = JSON.stringify(contacts, null, 2);
    await fs.writeFile(contactsPath, data);
}

const listContacts = async () => {
   try {
        const data = await fs.readFile(contactsPath);
        return JSON.parse(data);
    } catch (error) {
        // throw error;
    }
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    if(!result){
        return null;
    }
    return result;
}

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if(idx === -1){
        return null;
    }
    const [removeBook] = contacts.splice(idx, 1);
    await updateBooks(contacts);
    return removeBook;
}

const addContact = async (name,email,phone) => {
   const contacts = await listContacts();
    const newBook = {
      id: nanoid(),
      name,
      email,
      phone
    };
    contacts.push(newBook);
    await updateBooks(contacts);
    return newBook;
}

const updateContact = async (contactId, name, email,phone) => {
   const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    if(!result){
        return null;
    }
    result.name = name;
    result.email = email;
    result.phone = phone;
  
    await updateBooks(contacts);
    return result;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
