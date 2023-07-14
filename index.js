

//webwebsocketServer <==connected==>  http  <==connected==>  express

let express=require("express")
let {Server}=require('socket.io')
let app=express()
let http=require("http")
let cors=require("cors")
app.use(cors())
let server=http.createServer(app)
app.get("/",(req,res)=>{
    res.send({msg:"getting response"})
})

server.listen(8080,()=>{
    console.log("server is running")
})
// module.exports=server
// let io=new Server(server)
let count=0
const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});
console.log("hii")
io.on("connection",(socket)=>{
 count++
    console.log("connection")
 //socket.broadcast.emit("online",count)        //It sends count  to everyone except newone
 io.emit("online",count)     //It sends count value to everyone
  // socket.emit("online",count)   //It sends count value to newone not to everyone
  socket.emit("blah","hello from server 1")


  socket.on("xyz",(msg)=>{
  
    io.emit("zyx",msg)
  })
///////////////////////////////////////////////you tube////////////////////
console.log(socket.id)
socket.emit("me", socket.id);

socket.on("disconnect", () => {
  count--
  socket.broadcast.emit("callEnded")
  io.emit("online",count) 
});

socket.on("callUser", ({ userToCall, signalData, from, name }) => {
 
  io.to(userToCall).emit("callUser", { signal: signalData, from, name });
});

socket.on("answerCall", (data) => {
 
  io.to(data.to).emit("callAccepted", data.signal)
});


///////////////////////////////////////////////////////////////////////


//   socket.on("disconnect",()=>{
//     count--
//     //socket.broadcast.emit("online",count)//It sends to everyone except newone
//  io.emit("online",count)     //It sends count value to everyone
//   })

  
})
