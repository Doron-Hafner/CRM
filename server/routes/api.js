const express = require('express');
const router = express.Router()
const Sequelize = require('Sequelize');

const sequelize = new Sequelize('mysql://root:1234@localhost/crm_db')
sequelize.authenticate()
    .then(() => {
        console.log('connection successfully')
    })
    .catch(err => {
        console.log('connection failed', err)
    })

// ---------------- INITIALIZATION OF CLIENTS DATA --------------------
const clientList = require('../../react-crm-starter/data.json')
// router.get('/fetchClients', async (req, res) => {
//     try {
//         const result = await clientList.forEach(c => {
//             sequelize.query( `
//                             INSERT INTO client(id, name, email, first_contact, owner, country)
//                             VALUES('${c._id}', '${c.name}', '${c.email}', '${c.firstContact}', '${c.owner}', '${c.country}')
//                         ` )
//         })
//         res.send(result)
//     }catch(err) {
//         console.log(err)
//     }
// })

router.get('/clients', async (req, res) => {
    try{
    const clients = await sequelize.query(` SELECT SUBSTRING(name, 1, LOCATE(' ', name) - 1) AS firstName,
                                                   SUBSTRING(name, LOCATE(' ', name) + 1, LENGTH(name) - LOCATE(' ', name)) AS lastName,
                                                   email, first_contact, sold ,email_type, owner, country
                                            FROM client;`)
    res.send(clients)
    } catch(err) {
        console.log(err);
    }
})
router.get('/clients/:type/:value', async (req, res) => {
    const dataType = req.params.type
    const dataValue = req.params.value
    try{
    const client = await sequelize.query(` SELECT * FROM client 
                                            WHERE ${dataType} LIKE '%${dataValue}%'
    `)
    res.send(client)
    } catch(err) {
        console.log(err);
    }
})
// clientList.forEach(c => {
//     c.sold = c.sold ? 1 : null
//     sequelize.query(` UPDATE client SET sold = '${c.sold}' WHERE id = '${c._id}'
//         `)
// })
module.exports = router