require('dotenv').config()
const express = require('express');
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

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


let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id))
    : 0

  return maxId + 1;
}

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
})


app.get('/info', (req, res) => {
  res.contentType('html')
  const text = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `;
  res.end(text)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Person.findById(id)
    .then(person => {
      res.json(person.toJSON())
    })
    .catch(err => {
      console.log(err.message);
      res.status(404).end()
    })
})


app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id

  Person.findById(id)
    .then(person => {
      Person.deleteOne({ _id: id }).then(result => {
        res.status(204).end()
      })
    })
    .catch(error => {
      res.status(404).end()
    })
})


app.post('/api/persons', async (req, res) => {
  const body = req.body

  if (body.name === '' || body.number === '') {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }

  let person = await Person.find({ name: body.name })
  if (person.length > 0) {
    return res.status(200).json({
      error: `${body.name} is exists`
    })
  }

  const new_person = new Person({
    name: body.name,
    number: body.number
  })

  new_person.save().then(result => {
    res.json(result.toJSON())
  })

})

app.put('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const body = req.body

  if (body.name === '' || body.number === '') {
    return res.status(400).json({
      error: `not found name or number`
    })
  }

  Person.findById(id)
    .then(p => {
      p.updateOne(body).then(result => {
        res.json({ ...p.toJSON(), ...body })
      })
    })
    .catch(err => {
      console.log(err);
      res.status(404).end()
    })

  // if (!person) {
  //   return res.status(400).json({
  //     error: `not found id ${id}`
  //   })
  // }

  // if (body.name === '' || body.number === '') {
  //   return res.status(400).json({
  //     error: `name or number is not null`
  //   })
  // }

  // person = { ...body }
  // res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
