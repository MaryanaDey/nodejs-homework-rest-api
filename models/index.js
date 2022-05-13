const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) => {
    const data = JSON.stringify(contacts, null, 2);
    await fs.writeFile(contactsPath, data);
};

const getAll = async ()=> {
        const data = await fs.readFile(contactsPath);
        return JSON.parse(data);
};

const getById = async (id)=> {
    const books = await getAll();
    const result = books.find(item => item.id === id);
    if(!result){
        return null;
    }
    return result;
};

const add = async(name, email, phone) => {
    const contacts = await getAll();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
};


const updateById = async(id, name, email, phone) => {
    const contacts = await getAll();
    const result = contacts.find(item => item.id === id);
    if(!result){
        return null;
    }
    result.title = name;
    result.email = email;
    result.phone = phone;
    await updateContacts(contacts);
    return result;
};

const removeById = async (id) => {
    const contacts = await getAll();
    const idx = contacts.findIndex(item => item.id === id);
    if(idx === -1){
        return null;
    }
    const [removeContact] = contacts.splice(idx, 1);
    await updateContacts(contacts);
    return removeContact;
};


module.exports = {
    getAll,
    getById,
    add,
    updateById,
    removeById
}