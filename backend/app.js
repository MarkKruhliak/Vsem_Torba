const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')

const {UserRouter, AuthRouter} = require("./routes");

const app = express();

require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors())


app.use('/user', UserRouter)
app.use('/auth', AuthRouter)
app.get('/test', (req,res,next) => {
    res.json('Goood')
})


app.use((err, req, res, next) => {
    res.status(404).json(err.message || "Here must be massage from Error")
})

mongoose.set('strictQuery', false)

app.listen(5000, () => {
    mongoose.connect('mongodb://127.0.0.1:27017/VsemTorba')
    console.log("Server has started")
})
