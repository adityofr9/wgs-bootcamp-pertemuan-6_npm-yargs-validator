//NPM yargs
const yargs = require("yargs");
//Import semua fungsi dari contact.js
const contacts = require('./contact.js');

//console.log(yargs.argv);

yargs.command({
    command: 'add',
    describe: 'add new contact',  //Untuk menjelaskan describe untuk apa fungsi ini pada saat command console "node app add --help"
    builder:{
        name: {
            describe: 'Contact Name',
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'Contact email',
            demandOption: false,
            type: 'string',
        },
        mobile: {
            describe: 'contact mobile phone number',
            demandOption: true,
            type: 'string',
        },
    },

    handler(argv){
        // const contact = {
        //     name:argv.name,
        //     email:argv.email,
        //     mobile:argv.mobile,
        // };

        //code diatas diganti dengan code dibawah ini
        contacts.saveContact(argv.name,argv.email,argv.mobile);
    },
    // console.log(contact);
});

yargs.parse();



//File System
// const fs = require('fs');

//Import semua fungsi dari contact.js
//const contacts = require('./contact.js');

//const main = async () => {
    // const name = await contact.questions('What is your name? ');
    // const mobile = await contact.questions('What is your name? ');

    // contacts.saveContact(name, mobile);
// };

//Menjalankan fungsi main
//main();