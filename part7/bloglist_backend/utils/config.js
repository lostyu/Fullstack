require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URL

if (process.env.NODE_ENV === 'test') {
  MONGODB_URL = process.env.MONGODB_URL_TEST
} else {
  MONGODB_URL = process.env.MONGODB_URL
}

module.exports = {
  PORT,
  MONGODB_URL
}
