const faker = require('faker/locale/es');
require('dotenv').config();

const knex = require('knex')({
    client: 'pg',
    version: '9.6',
    connection: {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    },
    useNullAsDefault: true
});
const CREATE_USERS = false;
const CREATE_COMPANIES = false;
const CREATE_PRODUCTS = false;
const CREATE_INVOCES = true;
const CREATE_PRODUCT_INVOICES = true;

const generator = async function() {
    if (CREATE_USERS) {
        let users = [];
        for (let i = 10; i < 110; i++) {
            let randomStr = "";
            for (let j = 0; j < faker.random.number(15) + 3; j++) {
                randomStr += "{{random.alphaNumeric}}";
            }
            const user = {
                id: i,
                username: faker.name.firstName(),
                password: faker.fake(randomStr),
                email: faker.internet.email(),
                banned: faker.random.boolean(),
                group_id: faker.random.number(1) + 1
            }
            users.push(user);
        }
        
        await knex('user').insert(users).then((res) => console.log(res)).catch((err) => console.log(err));
    }
    
    if (CREATE_COMPANIES) {
        let companies = [];
        for (let i = 1; i <= 100; i++) {
            const company = {
                id: i,
                name: faker.company.companyName()
            }
            companies.push(company);
        }
        await knex('company').insert(companies).then((res) => console.log(res)).catch((err) => console.log(err));
    }
    
    if (CREATE_PRODUCTS) {
        let products = [];
        for (let i = 10; i < 110; i++) {
            const product = {
                id: i,
                name: faker.commerce.productName(),
                price: faker.random.number(1000),
                model: faker.commerce.productAdjective(),
                description: faker.commerce.productDescription(),
                megapixels: faker.random.number(99) + 1,
                ram_gb: faker.random.number(31) + 1,
                memory_gb: faker.random.number(255) + 1,
                battery_mah: faker.random.number(9000) + 1000,
                company_id: faker.random.number(99) + 1
            }
            products.push(product);
        }
        
        await knex('product').insert(products).then((res) => console.log(res)).catch((err) => console.log(err));
    }

    if (CREATE_INVOCES) {
        let invoices = [];
        for (let i = 0; i < 100; i++) {
            let creditCard = "4";
            for (let j = 0; j < 15; j++) {
                creditCard += "{{random.number(9)}}";
            }
            const invoice = {
                id: i,
                date: faker.date.past(),
                user_id: faker.random.number(99) + 10,
                creditcardnumber: faker.fake(creditCard)
            }
            invoices.push(invoice);
        }
        await knex('invoice').insert(invoices).then((res) => console.log(res)).catch((err) => console.log(err));
    }

    if (CREATE_PRODUCT_INVOICES) {
        let products = [];
        for (let i = 0; i < 100; i++) {
            const product = {
                id: i,
                name: faker.commerce.productName(),
                price: faker.random.number(1000),
                model: faker.commerce.productAdjective(),
                units: faker.random.number(9) + 1,
                invoice_id: faker.random.number(99)
            }
            products.push(product);
        }
        
        await knex('product_invoice').insert(products).then((res) => console.log(res)).catch((err) => console.log(err));
    }
}

generator();