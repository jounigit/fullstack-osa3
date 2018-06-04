const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = 'mongodb://fullstack:fullstackja@ds119090.mlab.com:19090/persons-ja'
// const url = 'mongodb://<user>:<pass>@ds119090.mlab.com:19090/persons-ja'

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {type: String, unique: true},
  number: String
})

personSchema.plugin(uniqueValidator)

personSchema.statics.format = function(person) {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}

const Person = mongoose.model('Person', personSchema)

module.exports = Person
