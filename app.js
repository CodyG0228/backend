// //For the sake of following along with the video, I've commented out what Mr. Hamby has deleted from his.


const express = require("express");
const Song = require("./models/song");
var cors = require('cors')

const app = express();
app.use(cors())

// Middleware that parses HTTP requests with JSON body
app.use(express.json());

const router = express.Router();

// Get list of all songs in the database
router.get("/songs", async(req,res) =>{
   try{
      const songs = await Song.find({})
      res.send(songs)
      console.log(songs)
   }
   catch (err){
      console.log(err)
   }

})

router.post("/songs", async(req,res) =>{
   try{
      const song = await new Song(req.body)
      await song.save()
      res.status(201).json(song)
      console.log(song)
   }
   catch(err){
      res.status(400).send(err)

   }
      
   
})


app.use("/api", router);

app.listen(3000);




// const express = require("express")
// const Song = require("./models/songs")
// var cors = require('cors')

// const app = express()
// app.use(cors())

// app.use(express.json());
// // app.use(bodyParser.json());
// const router = express.Router()

// router.get("/songs", async(req,res) =>{
//    try{
//       const songs = await Song.find({})
//       res.send(songs)
//       console.log(songs)
//    }
//    catch (err){
//       console.log(err)
//    }

// })

// router.post("/songs", async(req,res) =>{
//    try{
//       const song = await new Song(req.body)
//       await song.save()
//       res.status(201).json(song)
//       console.log(song)
//    }
//    catch(err){
//       res.status(400).send(err)

//    }
      
   
// })

// //const bodyParser = require("body-parser")





// //app.listen(3000,function(){
//     //console.log("Listening on port 4000")
// //})

// // router.get("/songs", function(req,res){
// //     const songs = [
// //         {
// //             title: "Home Is For The Heartless",
// //             artist: "Parkway Drive",
// //             popularity: 10,
// //             genre: ["metal", "metalcore"],
// //         },
// //         {
// //             title: "Dehumanized",
// //             artist: "Bring Me The Horizon",
// //             popularity: 10,
// //             genre: ["metal", "deathcore"],
// //         }    
// //     ]

// //     res.json(song)
// // })

// app.use("/api", router)
// app.listen(3000)

// //app.get("/hello", function(req,res){
//     //res.send("<h1>Hello Express</h1>")
// //})

// //app.get("/goodbye", function(req, res){
//     //res.send("<h1>Goodbye, Express</h1>")
// //});