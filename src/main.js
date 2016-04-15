import express from 'express'
import bodyParser from 'body-parser'
import * as storage from './storage'

const PORT = process.env.PORT || 3000
const app = express()

//----------------------------------
// Data Store
//---------------------------------


const items = storage.list('items')


app
    .use(bodyParser.json())


    .get('/categories', (req, res) => {
     const categories = storage.list('categories')
        res.json(categories)
    })
    .post('/categories', (req, res) => {
        const saved = storage.save('categories', req.body)
        res.json(saved)
    })

    .get('/categories/:id', (req, res) => {
        const categories = storage.list('categories')
        const category = categories.find((cat) => req.params.id == cat.id)

        if (category) {
            res.json(category)
        } else {
            res.status(404).send('Category not found')
        }
    })

    .get('/items', (req, res) => {
        const items = storage.list('items')
        res.json(items)
    })
    .get('/items/:id', (req, res) => {
        const items = storage.list('items')
        const item = items.find((item) => req.params.id == item.id)

        if (item){
            res.json(item)
        }else {
            res.status(404).send('Item not found')
        }

    })
    .post('/items', (req, res) => {
        const saved = storage.save('items', req.body)
        res.json(saved)
    })



app.listen(PORT, () => {
    console.log(`Server running at location at localhost:${PORT}`)
})