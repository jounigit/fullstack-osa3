const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())

morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'))

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-87654",
      "id": 1
    },
    {
      "name": "Martti Tienari",
      "number": "040-123456",
      "id": 2
    },
    {
      "name": "Arto Järvinen",
      "number": "040-123456",
      "id": 3
    },
    {
      "name": "Lea Kutvonen",
      "number": "040-123456",
      "id": 4
    }
  ]

  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })

  app.get('/info', (req, res) => {
    const d = new Date()
    const n = d.toString()
    const ulos = '<p>puhelinluettelossa ' + persons.length + ' henkilön tiedot</p><p>' + n + '</p>'

    if ( ulos ) {
    res.send(ulos)
    } else {
      response.status(404).end()
    }
  })

  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/api/persons/:id', (req, response) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if ( person ) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  const randomId = () => {
    const id = Math.floor(Math.random() * Math.floor(100))
    return id
  }

  app.post('/api/persons', (request, response) => {
    const body = request.body

    //body.name = "Peku Poku"
    //body.name = "Lea Kutvonen"
    //body.number = "11-2234"

    const name = persons.find(person => person.name === body.name)

      if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({error: 'nimi tai numero puuttuu'})
      }

      if (name) {
        return response.status(400).json({error: 'lisättävä nimi on jo luettelossa'})
      }

    const person = {
      name: body.name,
      number: body.number,
      id: randomId()
    }

    persons = persons.concat(person)

    console.log(person)
    response.json(person)
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
