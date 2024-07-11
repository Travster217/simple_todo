const express = require('express')
const { ObjectId } = require('mongodb')
const { connectToDb, getDb } = require('./server')

// init app
const app = express()
app.use(express.json())

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
    const todoItems = []

    db.collection('todoappcollection')
        .find()
        .sort({ id: 1})
        .forEach(item => todoItems.push(item))
        .then(() => {
            res.status(200).json(todoItems)
        })
        .catch(() => {
            res.status(500).json({error: 'Could not fetch list'})
        })
})

app.get('/list/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {
        db.collection('todoappcollection')
            .findOne({_id: new ObjectId(req.params.id)})
            .then(doc => {
                res.status(200).json(doc)
            })
            .catch(err => {
                res.status(500).json({error: 'Could not fetch the list item'})
            })
    } else {
        res.status(500).json({error: 'not a valid list id'})
    }

})

app.post('/list', (req, res) => {
    const listItem = req.body

    db.collection('todoappcollection')
        .insertOne(listItem)
        .then((result) => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({ err: 'could not create new list item'})
        })
})

app.delete('/list/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('todoappcollection')
            .deleteOne({_id: new ObjectId(req.params.id)})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({error: 'Could not delete the list item'})
            })
    } else {
        res.status(500).json({error: 'not a valid list id'})
    }
})

app.patch('/list/:id', (req, res) => {
    const updates = req.body

    if (ObjectId.isValid(req.params.id)) {
        db.collection('todoappcollection')
            .updateOne({_id: new ObjectId(req.params.id)}, {$set: updates})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({error: 'Could not update the list item'})
            })
    } else {
        res.status(500).json({error: 'not a valid list id'})
    }
})