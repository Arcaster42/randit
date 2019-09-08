//Server
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const port = process.env.PORT || 3000

//Database
const mongoose = require('mongoose')
mongoose.connect('127.0.0.1:27017', { useNewUrlParser: true })
import { UserModel } from './database/models'

//Authentication
const bcrypt = require('bcrypt')

app.get('/api', (req, res) => {
    res.sendStatus(200)
})

app.post('/api/user', (req, res) => {
    const userObj = req.body
    if (!userObj) return { err: 'Missing User Object' }
    const hash = bcrypt.hashSync(userObj.password, 10)
    const newUser = new UserModel({
        first_name: userObj.firstName,
        last_name: userObj.lastName,
        email: userObj.email,
        pass_hash: hash
    })
    newUser.save((err, doc) => {
        if (err) return { err }
        if (doc) return doc
    })
})

app.listen(port, () => console.log(`Listening on ${port}`))