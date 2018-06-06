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

// Get info
  app.get('/info', (request, response) => {
    const d = new Date()
    const n = d.toString()
    //let nb = Person.count
    Person.count({ }, function (err, count) {
      if (err) console.log(err)
      let c = JSON.stringify(count)
      const txt = '<p>puhelinluettelossa ' + c + ' henkilön tiedot</p><p> ' + n + '</p>'

      response.send(txt)
      })
  })

// Get all persons
  app.get('/api/persons', (request, response) => {
    Person
      .find({})
      .then(people => {
        response.json(people.map(Person.format))
      }) /*  */
    })

// Get person by id
    app.get('/api/persons/:id', (request, response) => {
      Person
        .findById(request.params.id)
        .then(person => {
          response.json(Person.format(person))
        })
    })

// Add new person
  app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined || body.number === undefined) {
      return response.status(400).json({error: 'nimi tai numero puuttuu'})
    }/**/

      Person.findOne({ name: body.name }, 'name', function (err, person) {
        //console.log("Err: ", err)

        if (person === null) {
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
              response.status(400).send({ error: 'tallennus epäonnistui' })
            })
        } else {
          response.status(400).send({ error: 'nimi on jo olemassa' })
        }
    })

  })

// Update person
  app.put('/api/persons/:id', (request, response) => {
    const body = request.body

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

// delete person
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
