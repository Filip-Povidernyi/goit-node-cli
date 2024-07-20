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

async function removeContact(contactId) {
    const contactsList = await contacts();
    const contact = contactsList.indexOf(contactId);
};

export async function addContact(name, email, phone) {

    if (!name || !email || !phone) {
        console.warn('Please enter full information (name, e-mail, phone)!')
    };

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