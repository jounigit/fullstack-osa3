const express = require('express')
const app = express()

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

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
