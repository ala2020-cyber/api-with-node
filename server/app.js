
// modules required

const express= require('express')
const {connectToDb,getDb} = require('./db')
const {ObjectId} =require('mongodb')
const cors=require('cors')

const app= express()

//middlewares

app.use(express.json())
app.use(cors())
app.use(express.static('../client'))

// database connection 
let db
connectToDb((err) => {
    if(!err){
        app.listen(3000, () => {
            console.log('server is running on port 3000...')
        })
        db= getDb()
    }
} )


// routes 
app.get("/api/movies", (req,res) => {
   let movies= []
   
   db.collection('movies').find().forEach(movie =>movies.push(movie))
     .then( () => res.status(200).json({success: true, data: movies}))
     .catch(() => res.status(500).json({success:false,error: 'could not fetch data please retry'}))

})

app.get("/api/movies/:id", (req,res) => {
   const {id}=req.params
   if(ObjectId.isValid(id)){
    db.collection('movies').findOne({_id: ObjectId(id)})
      .then((movie) => res.status(200).json({success: true, data: movie}))
      .catch(() => res.status(500).json({success:false,error: "could not find the movie"}))
   }
   else {
    res.status(404).json({success: false, message: "Id of movie is not valid"})
   }
   
})
app.post("/api/movies", (req,res) => {
    const newMovie= req.body

    db.collection('movies').insertOne(newMovie)
      .then( result => res.status(200).json({success: true, response: result}) )
      .catch( () => res.status(500).json({success: false, error: "could not insert data on your db"}))
})

app.delete("/api/movies/:id", (req,res) => {
    if (ObjectId.isValid(req.params.id)){
        db.collection('movies').deleteOne({_id:ObjectId(req.params.id)})
          .then( movie => res.status(200).json({success: true, response: movie}))
          .catch( () => res.status(500).json({success: false, error:"could not delete the movie"}))
    }
    else{
        res.status(404).json({success: false, message: "Id of movie is not valid"})
    }
})

app.patch("/api/movies/:id", (req,res) => {

    const updates= req.body
    if (ObjectId.isValid(req.params.id)){
        db.collection('movies').updateOne({_id:ObjectId(req.params.id)}, {$set: updates})
          .then( result => res.status(200).json({success: true, response: result}))
          .catch( () => res.status(500).json({success: false, error:"could not update the movie"}))
    }
    else{
        res.status(404).json({success: false, message: "Id of movie is not valid"})
    }
})



