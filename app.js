const express = require('express')
const { ObjectId } = require('mongodb')
const { connectToDb, getDb } = require('./server')

// init app
const app = express()

// db connection
let db

connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('app listening on port 3000')
        })
        db = getDb()
    }
})


//routes
app.get('/list', (req, res) => {
    let todoItems = []

    db.collection('todoappcollection')
        .find()
        .sort({ id: 1})
        .forEach(item => todoItems.push(item))
        .then(() => {
            res.status(200).json(todoItems)
        })
        .catch(() => {
            res.status(500).json({error: 'Could not fetch documents'})
        })
})

app.get('/list/:id', (req, res) => {
    db.collection('todoappcollection')
    .findOne({_id: new ObjectId(req.params.id)})
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({error: 'Could not fetch the documents'})
    })
})