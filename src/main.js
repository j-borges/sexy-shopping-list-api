import express from 'express'
import bodyParser from 'body-parser'

import * as storage from './storage'

const PORT = process.env.PORT || 3000
const app = express()

app
    .use(bodyParser.json())

    .get('/:collection', (req, res) => {
        const objects = storage.list(req.params.collection)

        if (objects) {
            res.json(objects)
        } else {
            res.status(404).send(`Could not find collection: ${req.params.collection}`)
        }
    })

    .get('/:collection/:id', (req, res) => {
        const { collection, id } = req.params

        const object = storage.find(collection, id)

        if (object) {
            res.json(object)
        } else {
            res.status(404).send(`Could not find object with id "${id}" in collection "${collection}".`)
        }
    })

    .post('/categories', (req, res) => {
        const saved = storage.add('categories', req.body)
        res.json(saved)
    })

    .delete('/categories/:id', (req, res) => {
        const wasFound = storage.remove('categories', req.params.id)

        const message = wasFound
            ? `Successfully removed category id: ${req.params.id}`
            : `Did not find category id: ${req.params.id}`

        res.status(404).send(message)
    })

    .post('/items', (req, res) => {
        const saved = storage.add('items', req.body)
        res.json(saved)
    })

    .delete('/items/:id', (req, res) => {
        const wasFound = storage.remove('items', req.params.id)

        if (wasFound) {
            res.send(`Successfully removed item id: ${req.params.id}`)
        } else {
            res.status(404).send(`Did not find item id: ${req.params.id}`)
        }
    })

app.listen(PORT, () => {
    console.log(`Listening http:/localhost:${PORT}`)
})