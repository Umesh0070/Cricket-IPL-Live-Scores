const express = require('express')
const path = require('path')
const hbs = require('hbs')
const myPort = process.env.PORT || 3000
const cric = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../views')

cric.set('views', viewsPath)
cric.set('view engine','hbs')
cric.use(express.static(publicDirectoryPath))

cric.get('',(req,res) => {
    res.render('index')
})

cric.listen(port,() => {
    console.log("Server is up on " + port)
})