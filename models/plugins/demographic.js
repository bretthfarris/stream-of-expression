module.exports = function demographic(schema) {
  // Add the two fields to the schema
  schema.add({
    demographic: {
      age: Number,
      gender: String,
      location: {
        ipaddress: String,
        city: String,
        country: String,
        postalcode: String 
      }
    }
  })
}