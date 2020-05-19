const mongoose = require('mongoose');

const url = process.env.MONGODB_URL

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    console.log('connecting mongodb');
  })
  .catch(err => {
    console.log(err.message);
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)

