
const express = require("express")
const { request } = require("http")
const app = express()
const server = require("http").Server(app)

const io = require("socket.io")(server,{
    cors:{
        origin:"*"
    }
})

const {ExpressPeerServer} = require("peer")
const peerServer = ExpressPeerServer(server,{debug:true})
app.use("/peerjs",peerServer)

app.set("view engine","ejs")
app.use(express.static("public"))
const {v4:uuidv4} = require("uuid")


app.get("/",(req,res)=>{
    res.redirect(`/${uuidv4()}`)
    
})

app.get("/:room",(req,res)=>{
    res.render("../view/index.ejs",{roomId:req.params.room})

})


io.on("connection",(socket)=>{
    socket.on("join-room",(roomId,userId,username)=>{
        socket.join(roomId)
        socket.on("message",(message)=>{
            io.to(roomId).emit("create message",message,username)
        })
    })
    
})

server.listen(3030)