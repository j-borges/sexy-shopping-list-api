import fs from 'fs'
import express from 'express'
import bodyParser from 'body-parser'
import * as storage from './storage'

const PORT = process.env.PORT || 3000
const app = express()

//----------------------------------
// Data Store
//---------------------------------

const categories = storage.list('categories')
const items = storage.list('items')
//----------------------------
// Server
//-----------------------------

app
    .use(bodyParser.json())


    .get('/categories', (req, res) => {
        res.json(categories)
    })
    .post('/categories', (req, res) => {
        categories.push(req.body)
        fs.writeFileSync('storage/categories.json', JSON.stringify(categories, null, 2))
        res.json(req.body)
    })

    .get('/categories/:id', (req, res) => {
        const category = categories.find((cat) => req.params.id == cat.id)

        if (category) {
            res.json(category)
        } else {
            res.status(404).send('Category not found')
        }
    })

    .get('/items', (req, res) => {
        res.json(items)
    })
    .get('/items/:id', (req, res) => {
        const item = items.find((item) => req.params.id == item.id)

        if (item){
            res.json(item)
        }else {
            res.status(404).send('Item not found')
        }

    })



app.listen(PORT, () => {
    console.log(`Server running at location at localhost:${PORT}`)
})