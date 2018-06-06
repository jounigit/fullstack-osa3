const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = ''

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {type: String, unique: true},
  number: String
})

personSchema.plugin(uniqueValidator)

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
