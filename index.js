

//webwebsocketServer <==connected==>  http  <==connected==>  express

let express=require("express")
let {Server}=require('socket.io')
let app=express()
let http=require("http")


let server=http.createServer(app)
app.get("/",(req,res)=>{
    res.send({msg:"getting response"})
})

server.listen(8080,()=>{
    console.log("server is running")
})

let io=new Server(server)
let count=0
io.on("connection",(socket)=>{
 count++
    
 //socket.broadcast.emit("online",count)        //It sends count  to everyone except newone
 //io.emit("online",count)     //It sends count value to everyone
   io.emit("online",count)   //It sends count value to newone not to everyone
  socket.emit("blah","hello from server 1")


  socket.on("xyz",(msg)=>{
  
    io.emit("zyx",msg)
  })


  socket.on("disconnect",()=>{
    count--
    //socket.broadcast.emit("online",count)//It sends to everyone except newone
 io.emit("online",count)     //It sends count value to everyone
  })

  
})
