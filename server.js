//Server
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const port = process.env.PORT || 3000

//Database
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/randit', { useNewUrlParser: true })
const { UserModel } = require('./database/models')

//Authentication
const bcrypt = require('bcrypt')

app.get('/api', (req, res) => {
    res.sendStatus(200)
})

app.post('/api/user', async (req, res) => {
    console.log('POST USER')
    const userObj = req.body
    if (!userObj) res.send({ err: 'Missing User Object' })
    const search = await UserModel.findOne({ email: userObj.email })
    if (search) res.send({ err: 'Email Unavailable' })
    if (!search) {
        const hash = bcrypt.hashSync(userObj.password, 10)
        const newUser = new UserModel({
            first_name: userObj.firstName,
            last_name: userObj.lastName,
            username: userObj.username,
            email: userObj.email,
            pass_hash: hash
        })
        newUser.save((err, doc) => {
            if (err) res.send({ err })
            if (doc) res.send(doc)
        })
    }
})

app.listen(port, () => console.log(`Listening on ${port}`))