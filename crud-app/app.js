const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

//middlewre
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//all mongoose setup
mongoose.connect('mongodb://localhost/curd-app')
.then(() => {
    console.log('mongoose connected!')
})
.catch(err => {
    console.log(err)
})

require('./models/info')
const Info = mongoose.model('info')

app.get('/', (req,res) => {
    Info.find({})
    .then(info => {
        res.json(info)
    })
    .catch(err => {
        res.send(err)
    })
})

app.post('/', (req,res) => {
    const newInfo = {
        Name: req.body.Name,
        PhoneNumber: req.body.PhoneNumber
    }
    new Info(newInfo)
    .save()
    .then(info => {
        res.json(info)
        
    })
    .catch(err => {
        res.json(err)
    })
})

app.put('/:Name', (req,res) => {
    Info.findOne({
        Name: req.params.Name
    })
    .then(info => {
        //new values
        info.Name = req.body.Name;
        info.PhoneNumber = req.body.PhoneNumber;

        info.save()
        .then(info => {
            res.json(info)
        })
        .catch(err =>{
            res.json(err)
        })

    })
})

// app.put('/:Name', (req,res) => {
//     Info.findOne({Name: req.params.Name})
//     .then(info => {
//         info.Name = req.body.Name
//         info.PhoneNumber = req.body.PhoneNumber
//         info.save()
//         .then(info => {
//             res.json({"success": "ok"})
//         }).catch(err => {res.json({"error": err})})
//     })
// })

app.delete('/:Name', (req,res) => {
    Info.remove({Name: req.params.Name})
    .then(info => {
        res.json(info)
    })
    .catch(err => {
        res.json(err)
    })
})


const port = 3000

app.listen(port, () =>{
    console.log(`running on ${port}`)
})