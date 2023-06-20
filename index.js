const {
    getContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
} = require('./contacts');
const program = require('commander');

program
    .option('-ac, --action <type>', 'choose action')
    .option('-id, --id <type>', 'contact id')
    .option('-na, --name <type>', 'contact name')
    .option('-em, --email <type>', 'contact email')
    .option('-ph, --phone <type>', 'contact phone');

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const contactsList = await getContacts();
            console.table(contactsList);
            break;
        case 'get':
            const searchedContact = await getContactById(id);
            console.table(searchedContact);
            break;
        case 'add':
            const newContact = await addContact(name, email, phone);
            console.table(newContact);
            break;
        case 'remove':
            const removedContact = await removeContact(id);
            console.table(removedContact);
            break;
        case 'update':
            const updatedContact = await updateContact(id, name, email, phone);
            console.table(updatedContact);
            break;
        default:
            console.warn('\x1b[41m Unknown action!');
    }
}

invokeAction(options);
