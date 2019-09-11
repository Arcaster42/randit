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
const db = mongoose.connection
db.once('open', () => console.log('Connected to DB'))
//Models
const { UserModel } = require('./database/models')

//Authentication
const bcrypt = require('bcrypt')

//Datetime
const moment = require('moment')

app.get('/api/user', async (req, res) => {
    console.log('GET USER')
    const userObj = req.query
    if (!userObj) res.send({ err: 'Missing User Object' })
    const account = await UserModel.findOne({ email: userObj.email })
    if (!account) res.send({ err: 'Invalid Email' })
    if (account) {
        const valid = bcrypt.compareSync(userObj.password, account.pass_hash)
        if (!valid) res.send({ err: 'Invalid Password' })
        if (valid) res.send(account)
    }
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
            pass_hash: hash,
            checkin: { active: false, timeleft: null, message: null }
        })
        newUser.save((err, doc) => {
            if (err) res.send({ err })
            if (doc) res.send(doc)
        })
    }
})

app.get('/api/checkin', async (req, res) => {

})

app.post('/api/checkin', (req, res) => {
    console.log('POST CHECKIN')
    console.log(req.body)
    const userObj = req.body.user
    const checkinObj = req.body.checkin
    console.log(checkinObj)
    UserModel.findOneAndUpdate({ emails: userObj.email }, { checkin: checkinObj }, (err, doc) => {
        if (err) res.send(err)
        else {
            userObj.checkin = checkinObj
            res.send(userObj)
        }
    })
})

app.listen(port, () => console.log(`Listening on ${port}`))