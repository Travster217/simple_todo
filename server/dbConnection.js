const { MongoClient } = require('mongodb')
let uri = 'mongodb+srv://testUser1:Password123@cluster0.woasxqw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
let dbConnection

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(uri)
            .then((client) => {
                dbConnection = client.db('todoappdb')
                return cb()
            })
            .catch(err => {
                console.log(err)
                return cb(err)
            })
    },
    getDb: () => dbConnection
}