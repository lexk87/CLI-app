const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function writeContacts(contacts) {
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function getContacts() {
    const contacts = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(contacts);
    return parsedContacts;
}

async function getContactById(contactId) {
    const contacts = await getContacts();
    const contact = contacts.find(contact => contact.id === contactId);

    return contact || null;
}

async function removeContact(contactId) {
    const contacts = await getContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);

    if (!index) {
        return null;
    }

    const [removedContact] = contacts.splice(index, 1);
    await writeContacts(contacts);

    return removeContact;
}

async function addContact(name, email, phone) {
    if (!name || !email || !phone) {
        return null;
    }

    const contacts = await getContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };

    contacts.push(newContact);
    await writeContacts(contacts);

    return newContact;
}

async function updateContact(contactId, name, email, phone) {
    const contacts = await getContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);

    if (index === -1) {
        return null;
    }

    const { id, name: oldName, email: oldEmail, phone: oldPhone } = contacts[index];

    contacts[index] = {
        id,
        name: name ?? oldName,
        email: email ?? oldEmail,
        phone: phone ?? oldPhone,
    };

    await writeContacts(contacts);
    return contacts[index];
}

module.exports = {
    getContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};
