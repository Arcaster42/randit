//Server
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const port = process.env.PORT || 3000

//Websocket Server
const ws = require('ws').Server
const socket = new ws({ port: 3001 })

//Websocket Client Class
class Clients {
    construct() {
        this.clientList = {}
        this.saveClient = (email, clientSocket) => {
            this.clientList[email] = clientSocket
        }
    }
}

//Websocket Logic
const clients = new Clients()

socket.on('connection', (clientSocket) => {
    socket.on('message', (message) => {
        console.log(message)
        clients.saveClient(message, clientSocket)
        clients.clientList[message].send('Login Registered')
    })
})

//Database
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
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
            checkin: { active: false, timeleft: null, message: null },
            contacts: []
        })
        newUser.save((err, doc) => {
            if (err) res.send({ err })
            if (doc) res.send(doc)
        })
    }
})

app.get('/api/checkin', async (req, res) => {
    console.log('GET CHECKIN')
    console.log(req.query)
    const userObj = req.query
    let doc = await UserModel.findOne({ email: userObj.email })
    if (doc) res.send(doc)
})

app.post('/api/checkin', (req, res) => {
    console.log('POST CHECKIN')
    const userObj = req.body.user
    const checkinObj = req.body.checkin
    UserModel.findOneAndUpdate({ email: userObj.email }, { 'checkin': checkinObj }, { upsert: true, new: true }, (err, doc) => {
        if (err) res.send(err)
        if (!doc) res.send({ err: 'Database Error' })
        if (doc) {
            res.send(doc)
        }
    })
})

app.listen(port, () => console.log(`Listening on ${port}`))