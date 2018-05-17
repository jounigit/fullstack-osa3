const mongoose = require('mongoose')

const url = 'mongodb://fullstack:fullstackja@ds119090.mlab.com:19090/persons-ja'
// const url = 'mongodb://<user>:<pass>@ds119090.mlab.com:19090/persons-ja'

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

personSchema.static.format = function(person) {
/*  return this.findById(person._id)
          .then(person => {
            return {
              name: person.name
            }
          })
 */
  return this.find( {_id: person._id}, (person) => {
            return {
              name: person.name
            }
        } )

}

const Person = mongoose.model('Person', personSchema)

module.exports = Person
