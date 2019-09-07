const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const port = process.env.PORT || 3000

app.get('/api', (req, res) => {
    res.sendStatus(200)
})

app.listen(port, () => console.log(`Listening on ${port}`))