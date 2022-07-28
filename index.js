const express = require('express')
const cors = require('cors')
const data = require('./restaurants.json')
const fs = require('fs') // node package file system

const app = express()
app.use(cors())
app.use(express.json())

app.listen(4000, () => console.log('Our API running on 4000'))

const handleWriteFile = () => {
    const dataJson = JSON.stringify(data) //converting to back to JSON
    fs.writeFile('restaurants.json', dataJson, err => console.error(err)) // writting json file with new restaurant
}

app.get('/', (req,res) => {
    res.send(data)
})

// add new restaurant
app.post('/add-restaurant', (req, res) => {

    data.push(req.body) //add new restaurant

    handleWriteFile()
    res.send(data)
})

// find and update a restaurant
app.patch('/update-restaurant', (req, res) => {
    //console.log(req.query)
    const { name } = req.query
    //console.log(name)
    // find item to update req.query
    const itemFound = data.find(eachRestaurant => eachRestaurant.name === name)

    const indexOfItem = data.indexOf(itemFound)
    data[indexOfItem] = req.body

    //console.log('itemfound', itemFound)

    handleWriteFile()
    res.send(data)
})
// find and delete a restaurant

app.delete('/delete-restaurant', (req, res) => {
    console.log(req.query)
    const { name } = req.query
    console.log(name)
    // find item to update req.query
    const itemFound = data.find(eachRestaurant => eachRestaurant.name === name)
    const indexOfItem = data.indexOf(itemFound)
    //data[indexOfItem]
    delete data[indexOfItem]
    console.log(itemFound)

    handleWriteFile()
    res.send(data)
})
