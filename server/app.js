if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
// const port = process.env.PORT || 3000
const cors = require('cors')
const bodyParser = require("body-parser")

const router = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.static('reportPdf'))
app.use(express.urlencoded({
  extended: true
}))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(router)

app.use(errorHandler)

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

module.exports = app