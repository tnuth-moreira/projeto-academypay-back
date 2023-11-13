const express = require('express')
const { registerClient } = require('./controlers/register')
const { consultClient } = require('./controlers/consult')
const { deleteClient } = require('./controlers/delete')
const schemaClient = require('./schemas/schemaClient')
const validateRegisterClient = require('./intermediate/ValidateRegisterClient')

const routes = express()

routes.post('/register', validateRegisterClient(schemaClient), registerClient)

routes.get('/consult', consultClient)

routes.delete('/delete', deleteClient)

module.exports = routes