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

personSchema.statics.format = function(person) {
  //return   console.log(person.name)
//  return Person.find( {_id: person._id})
   Person.find( {_id: person._id}, function(err, person) {
                console.log(person)
                return {
                  name: person[0][0]
                }
            } )
/**/
 /*return Person.find( {_id: person._id})
        .then(person =>{
           console.log(person)
            return   person.name
        })
 */
/* Person.find( {_id: person._id}, function(err, person) {
             console.log(person)
             return person[0]
         } )
  return this.find( {_id: person._id}, function(err, person) {
            console.log(person.name)
        } ) */

}

const Person = mongoose.model('Person', personSchema)

module.exports = Person
