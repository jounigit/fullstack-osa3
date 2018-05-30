const mongoose = require('mongoose')

const url = 'mongodb://<user>:<pass>@ds119090.mlab.com:19090/persons-ja'
// const url = 'mongodb://<user>:<pass>@ds119090.mlab.com:19090/persons-ja'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

module.exports = Person
