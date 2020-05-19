const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password');
  process.exit()
}

const password = process.argv[2]

const url = `mongodb+srv://mongoose123:${password}@cluster0-fjvjp.azure.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 5 && process.argv.length > 3) {
  console.log('give name and number argument');
  process.exit()
}

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(response => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close()
  })
}

if (process.argv.length === 3) {
  Person.find({}).then(res => {
    console.log('phonebook:');
    res.forEach(p => {
      console.log(p.name, ' ', p.number);
    })

    mongoose.connection.close()
  })
}