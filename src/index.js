import { program } from "commander";
import { addContact, getContactById, listContacts } from "./contacts.js"

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const list = await listContacts();
            console.table(list);
            break;

        case "get":
            if (!id) {
                console.warn("Please provide an id for the get action.");
                return;
            }
            const contactById = await getContactById(id);
            console.table('contactById', contactById);
            break;

        case "add":
            addContact(name, email, phone)
            break;

        case "remove":
            // ... id
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(options);