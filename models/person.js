const mongoose = require('mongoose')

 const url = ''

mongoose.connect(url)
/*
const Person = mongoose.model('Person', {
  name: String,
  number: String
}) */

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.statics.format = function(person) {
  //return   console.log(person)
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}

const Person = mongoose.model('Person', personSchema)

module.exports = Person
