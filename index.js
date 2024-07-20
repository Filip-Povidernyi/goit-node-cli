import { program } from "commander";
import { addContact, getContactById, listContacts, removeContact } from "./contacts.js"

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
            console.table(list);
            break;

        case "get":
            if (!id) {
                console.warn("\x1B[31m Please provide an id for the get action.");
                return;
            }
            const contactById = await getContactById(id);
            if (contactById === null) {
                console.warn("\x1B[31m Please, check your id. It's wrong");
                return;
            };
            console.table(contactById);
            break;

        case "add":
            if (!name || !email || !phone) {
                console.warn('\x1B[31m Please enter full information (name, e-mail, phone)!');
                return;
            };

            const newContact = await addContact(name, email, phone);
            console.table(newContact);
            break;

        case "remove":
            if (!id) {
                console.warn("\x1B[31m Please provide an id for the get action.");
                return;
            };
            const contact = await removeContact(id);
            if (contact) {
                console.log(`Your contact with id: ${id} was removed`)
                console.table(contact[0]);
            };
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(options);