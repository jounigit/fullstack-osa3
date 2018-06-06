const mongoose = require('mongoose')

if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}

const url = process.env.MONGODB_URI

mongoose.connect(url)

//console.log(url)
/*
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
}) */

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

if ( process.argv[2] && process.argv[3] ) {

  const person = new Person({
    name: process.argv[2],
    number: process.argv[3]
  })

  console.log(`lisätään henkilö ${person.name} numero ${person.number} luetteloon`)

  person
    .save()
    .then(response => {
      console.log('person saved!')
      mongoose.connection.close()
    })
} else {
  Person
    .find({})
      .then(people => {
        console.log('puhelinluettelo:')
        people.forEach(person => {
          console.log(person.name + ' ' + person.number)
        })
        mongoose.connection.close()
      })
}
