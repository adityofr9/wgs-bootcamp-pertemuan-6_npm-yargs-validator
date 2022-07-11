//File System
const fs = require('fs');
//Readline
const readline = require('readline');
//NPM Validator
const validator = require('validator');

// const { rejects } = require('assert');
// const { resolve } = require('path');

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

//Fungsi untuk menyimpan data contact
const saveContact = (name, email, mobile) => {
    const contact = {name, email, mobile};
    const file = fs.readFileSync('data/contacts.json', 'utf8');
    const contacts = JSON.parse(file);

    //Variabel untuk menemukan isi name yang sama pada array
    const duplicateName = contacts.find(contact => contact.name === name);
    //Variabel untuk memvalidasi email dengan NPM Validator
    const vldEmail = validator.isEmail(contact.email);
    //Variabel untuk memvalidasi nomor telepon dengan NPM Validator
    const vldMobile = validator.isMobilePhone(contact.mobile, 'id-ID');
    
    //Pengkondisian apabila duplikat isi name pada array tidak ada
    if (!duplicateName) {
        //Pengkondisian apabila input variabel vldEmail sudah valid
        if (vldEmail == true) {
            //Pengkondisian apabila input variabel vldMobile sudah valid
            if (vldMobile == true) {
                contacts.push(contact);
                fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
                console.log('Terima kasih sudah memasukkan data!');
            }
            //Apabila input variabel vldMobile masih invalid 
            else {
                console.log('Data mobile phone yang dimasukkan invalid! Harap check kembali sesuai format mobile phone Indonesia');
            };
        }
        //Apabila input variabel vldEmail masih invalid 
        else {
            console.log('Data email yang dimasukkan invalid!');
        };
    }
    //Apabila duplikat isi name pada array ditemukan
    else {
        console.log('Data name yang dimasukkan sudah ada!');
    };

    // rl.close();
};

//Export module dari contact.js
// module.exports = {questions, saveContact};
module.exports = {saveContact};