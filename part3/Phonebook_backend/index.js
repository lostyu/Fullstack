const express = require('express');
const app = express()
const morgan = require('morgan')

morgan.token('type', (req, res) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))


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
  res.json(persons)
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
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }

})


app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})


app.post('/api/persons', (req, res) => {
  const body = req.body

  if (body.name === '' || body.number === '') {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }

  if (persons.some(p => p.name === body.name)) {
    return res.status(200).json({
      error: `${body.name} is exists`
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)
  res.json(persons)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
