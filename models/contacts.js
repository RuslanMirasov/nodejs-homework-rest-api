const { NewId } = require("../helpers");
// const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const contact = data.find((contact) => contact.id === contactId);
  return contact || null;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: NewId(),
    ...body,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const contact = data.findIndex((contact) => contact.id === contactId);
  if (contact === -1) {
    return null;
  }
  const [deletedContact] = data.splice(contact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return deletedContact;
};

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const updatedContact = data.findIndex((contact) => contact.id === contactId);
  if (updatedContact === -1) {
    return null;
  }
  data[updatedContact] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return data[updatedContact];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
