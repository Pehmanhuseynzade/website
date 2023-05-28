const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(bodyParser.json())
dotenv.config()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const aromaSchema = new mongoose.Schema({
    name: String,
    price: Number,
    desc: String,
    image: String,
});

const aromaModel = mongoose.model('Aroma', aromaSchema);


app.post('/api/aroma',async(req,res)=>{
    const {name,price,desc,image}=req.body
    const newPost = await aromaModel({
        name:name,
        price:price,
        desc:desc,
        image:image
    })
    await newPost.save()
    res.status(201).send({
        messsage:"Posted successfully",
        payload:newPost
    })
})

app.get('/api/aroma',async(req,res)=>{
    const{name}=req.query
    const newGet = await aromaModel.find()
    if(!name){
        res.status(200).send(newGet)
    }
    else{
        const searched = newGet.filter((x)=>
        x.name.toLowerCase().trim().includes(name.toLowerCase().trim())
        )
        res.status(200).send(searched)
    }
})

app.get('/api/aroma/:id',async(req,res)=>{
    const {id} = req.params
    const newID = await aromaModel.findById(id)
    res.status(200).send(newID)
})

app.delete('/api/aroma/:id',async(req,res)=>{
    const id = req.params.id
    const newDelete = await aromaModel.findByIdAndDelete(id)
    res.status(202).send(newDelete)
})



PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

DB_PASSWORD = process.env.DB_PASSWORD
DB_CONNECTION = process.env.DB_CONNECTION

mongoose.connect(DB_CONNECTION.replace('<password>', DB_PASSWORD)).then(() => {
    console.log("Mongodb Connected!!!")
});
