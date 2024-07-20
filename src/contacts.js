import fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";



const contactsPath = path.resolve("src", "db", "contacts.json");

const contacts = async () => {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
};


export async function listContacts() {
    const contactsList = await contacts();
    return contactsList;
};

export async function getContactById(contactId) {
    const contactsList = await contacts();
    const contact = contactsList.find(contact => contact.id === contactId);
    return contact || null;
};

export async function removeContact(contactId) {

    if (contactId.length !== 21) {
        console.warn(`\x1B[31m Invalid id: ${contactId}`);
        return null;
    }

    const contactsList = await contacts();

    const index = contactsList.findIndex(contact => contact.id === contactId);

    if (index === -1) {
        console.log(`\x1B[31m No contact with this id: ${contactId}`)
        return null;
    };

    const remContact = contactsList.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

    return remContact;
};

export async function addContact(name, email, phone) {

    const contactsList = await contacts();

    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };

    console.table(newContact);

    contactsList.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

};