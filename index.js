import { program } from "commander";
import { addContact, getContactById, listContacts, removeContact } from "./contacts.js";

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {

        case "list":

            const list = await listContacts();
            console.log('\x1B[32mContacts List:\x1B[0m');
            console.table(list);
            break;

        case "get":

            if (!id) {
                console.warn("\x1B[31mPlease provide an id for the get action.\x1B[0m");

                return;
            }

            const contactById = await getContactById(id);

            if (contactById === null) {
                console.warn("\x1B[31mPlease check your id. It's incorrect.\x1B[0m");

                return;
            }

            console.log('\x1B[32mContact Found:\x1B[0m');
            console.log(contactById);
            break;

        case "add":

            if (!name || !email || !phone) {
                console.warn('\x1B[31mPlease enter full information (name, email, phone)!\x1B[0m');

                return;
            }

            const newContact = await addContact(name, email, phone);
            console.log('\x1B[32mNew Contact Added:\x1B[0m');
            console.log(newContact);
            break;

        case "remove":

            if (!id) {
                console.warn("\x1B[31mPlease provide an id for the remove action.\x1B[0m");

                return;
            }

            const contact = await removeContact(id);

            if (contact) {
                console.log(`\x1B[32mYour contact with id: ${id} was removed\x1B[0m`);
                console.log(contact);

            } else {
                console.warn(`\x1B[31mContact with id: ${id} not found.\x1B[0m`);
            }
            break;

        default:
            console.warn("\x1B[31mUnknown action type!\x1B[0m");
    }
}

invokeAction(options);

