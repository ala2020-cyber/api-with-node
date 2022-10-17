const {MongoClient} = require('mongodb')

let dbConnection
const url= 'mongodb://localhost:27017/moviesDb'
module.exports= {
    connectToDb: (cb) => {
        MongoClient.connect(url)
          .then( (client) => {
            dbConnection=client.db()
            return cb()
          })
          .catch( (err) => {
            console.log(err)
            return cb(err)
          })
    },
    getDb: () => dbConnection
}