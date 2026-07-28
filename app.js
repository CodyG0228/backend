//For the sake of following along with the video, I've commented out what Mr. Hamby has deleted from his.

const User = require("./models/user")
const jwt = require("jwt-simple")
const express = require("express")
const Song = require("./models/songs")
var cors = require('cors')

const app = express()
app.use(cors())

app.use(express.json());

const router = express.Router()
const secret = process.env.JWT_SECRET || "mysecretkey";
router.get("/songs", authMiddleware, async(req,res) =>{
   try{
      const songs = await Song.find({})
      res.send(songs)
      console.log(songs)
   }
   catch (err){
      console.log(err)
   }
})

router.post("/songs", authMiddleware, async (req, res) => {
  try {
    const song = new Song(req.body);
    await song.save();
    res.status(201).json(song);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ username: user.username });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            return res.status(401).send("USER NOT FOUND. Have you registered?")
        }
        if (user.password !== req.body.password) {
            return res.status(401).send("Incorrect password. Double check spelling.")
        }
        const token = jwt.encode({ username: user.username }, secret)
        res.json({ token: token })
    } catch (err) {
        res.status(400).send(err)
    }
})

function authMiddleware(req, res, next) {
    const token = req.headers["x-auth"] 
    if (!token) {
        return res.status(401).send("---NO TOKEN PROVIDED---")
    }
    try {
        const decoded = jwt.decode(token, secret)
        req.user = decoded
        next()
    } catch (err) {
        res.status(401).send("---INVALID TOKEN---")
    }
}


//const bodyParser = require("body-parser")





//app.listen(3000,function(){
    //console.log("Listening on port 4000")
//})

// router.get("/songs", function(req,res){
//     const songs = [
//         {
//             title: "Home Is For The Heartless",
//             artist: "Parkway Drive",
//             popularity: 10,
//             genre: ["metal", "metalcore"],
//         },
//         {
//             title: "Dehumanized",
//             artist: "Bring Me The Horizon",
//             popularity: 10,
//             genre: ["metal", "deathcore"],
//         }    
//     ]

//     res.json(song)
// })

app.use("/api", router)
app.listen(process.env.PORT || 3000) //for render and local
//app.get("/hello", function(req,res){
    //res.send("<h1>Hello Express</h1>")
//})

//app.get("/goodbye", function(req, res){
    //res.send("<h1>Goodbye, Express</h1>")
//});