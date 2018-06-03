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
      .then(people => {
      //  persons.map(Person.format)
        response.json(people.map(Person.format))
      }) /*  */
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

  app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined || body.number === undefined) {
      return response.status(400).json({error: 'nimi tai numero puuttuu'})
    }/**/

    console.log('Uusi nimi')
    const person = new Person({
        name: body.name,
        number: body.number
      })

      person
        .save()
        .then(savedPerson => {
          response.json(savedPerson)
        })
        .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'tallennus epäonnistui' })
      })
  })

  app.put('/api/persons/:id', (request, response) => {
    const body = request.body
    //body.number = 222-4444
    //const id = '_5b139999282c3c189850ed50'
    const id = Number(request.params.id)
    console.log(request.params.id)
    console.log(body.name)
    console.log(body.number)
    Person
      .findByIdAndUpdate(request.params.id, { number: body.number}, {new: true})
      .then(updatedPerson => {
        response.json(Person.format(updatedPerson))
      })
      .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'päivitys epäonnistui' })
      })/* */
  })

  app.delete('/api/persons/:id', (request, response) => {
    Person
      .findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => {
      response.status(400).send({ error: 'malformatted id' })
    })
  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
