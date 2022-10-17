
// modules required

const express= require('express')
const {connectToDb,getDb} = require('./db')
const {ObjectId} =require('mongodb')

const app= express()

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
      .catch(() => res.status(404).json({success:false,error: "could not find the movie"}))
   }
   
})




