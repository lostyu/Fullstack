require('dotenv').config()
const express = require('express');
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const errorHandler = require('./middlewares/errorHandler')


morgan.token('type', (req, res) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))
app.use(cors())
app.use(express.static('build'))


app.get('/info', (req, res) => {
  Person.find({})
    .then(result => {
      result = result.map(item => item.toJSON())
      res.send(`
        <h2>phonebook:</h2>
        <p>person length is ${result.length}</p>
      `).end()
    })
})


app.post('/api/persons', async (req, res, next) => {
  const body = req.body

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      res.json(savedPerson.toJSON())
    })
    .catch(error => next(error))

})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body

  if (body.name === '' || body.number === '') {
    return res.status(400).json({
      error: `not found name or number`
    })
  }

  Person.findByIdAndUpdate(id, body, { new: true })
    .then(result => {
      if (result) {
        res.json(result.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
})


app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      if (result) {
        res.status(204).end()
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})


app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
