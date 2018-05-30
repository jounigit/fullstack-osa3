const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())

morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'))


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

  app.get('/api/persons', (request, response) => {
      Person
        .find({})
        .then(persons => {
          persons.map(Person.format)
          //response.json(persons.map(Person.format))
        }) /*  */
    })

  app.get('/api/persons/:id', (request, response) => {
    Person
      .findById(request.params.id)
      .then(person => {
         console.log('index.js: ' + person)
        //Person.format(person)
        response.json(Person.format(person))
        //response.json(person)
      })
  })


  app.post('/api/persons', (request, response) => {
    const body = request.body

    //body.name = "Peku Poku"
    //body.name = "Lea Kutvonen"
    //body.number = "11-2234"

      if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({error: 'nimi tai numero puuttuu'})
      }

    const person = new Person({
      name: body.name,
      number: body.number
    })

    person
      .save()
      .then(savedPerson => {
        response.json(savedPerson)
      })

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
