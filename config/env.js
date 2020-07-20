const dotenv = require('../db.env')

const result = dotenv.config('./db.env')
 
if (result.error) {
  throw result.error
}
 
console.log(result.parsed)