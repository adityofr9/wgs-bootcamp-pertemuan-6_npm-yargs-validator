//File System
const fs = require('fs');
//Readline
const readline = require('readline');
//NPM Validator
const validator = require('validator');

const { rejects } = require('assert');
const { resolve } = require('path');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

//Membuat folder "data" apabila folder tidak ada
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

//Membuat file "contacts.json" apabila file tidak ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

//Membuat fungsi ask menggunakan promise
// const questions = (ask) => {
//     return new Promise((resolve, reject) => {
//         rl.question(ask, (inputVariable) => {
//             resolve(inputVariable);
//         });
//     });
// };


const saveContact = (name, email, mobile) => {
    const contact = {name, email, mobile};
    const file = fs.readFileSync('data/contacts.json', 'utf8');
    const contacts = JSON.parse(file);

    const duplicateName = contacts.find(contact => contact.name === name);
    const vldEmail = validator.isEmail(contact.email);
    const vldMobile = validator.isMobilePhone(contact.mobile, 'id-ID');
    
    if (!duplicateName) {
        if (vldEmail == true) {
            if (vldMobile == true) {
                contacts.push(contact);
                fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
                console.log('Terima kasih sudah memasukkan data!');
            } else {
                console.log('Data mobile phone yang dimasukkan invalid! Harap check kembali sesuai format mobile phone Indonesia');
            };
        } else {
            console.log('Data email yang dimasukkan invalid!');
        };
    } else {
        console.log('Data name yang dimasukkan sudah ada!');
    };

    // rl.close();
};


// module.exports = {questions, saveContact};
module.exports = {saveContact};