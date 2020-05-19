const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password');
  process.exit()
}

const password = process.argv[2]

const url = `mongodb+srv://mongoose123:${password}@cluster0-fjvjp.azure.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String
})

const PhoneBook = mongoose.model('PhoneBook', phonebookSchema)

if (process.argv.length < 5 && process.argv.length > 3) {
  console.log('give name and number argument');
  process.exit()
}

if (process.argv.length === 5) {
  const person = new PhoneBook({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(response => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close()
  })
}

if (process.argv.length === 3) {
  PhoneBook.find({}).then(res => {
    console.log('phonebook:');
    res.forEach(book => {
      console.log(book.name, ' ', book.number);
    })

    mongoose.connection.close()
  })
}