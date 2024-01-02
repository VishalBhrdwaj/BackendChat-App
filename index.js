const express=require("express");
const app=express();
const http=require("http");
const server=http.createServer(app);
const {Server}=require("socket.io");
const cors=require("cors")
app.use(cors())


const io=new Server(server,{
    cors:{
        origin:"*"
    }
})
 
io.on('connection',(socket)=>{
    socket.on("new_user_joined",(userData)=>{
        console.log(`${userData.name} joined the chat`)
        io.emit("new_user_joined",userData)
    })
    socket.on("send_message",(data)=>{
        console.log("Message Recieved on server",data);
        socket.broadcast.emit("recieve_message",data);
    })
    socket.on("disconnect",()=>{
        console.log("user leave the chat ",socket.id);
    })
})

server.listen(3000,()=>{
    console.log(`Server Started at port 3000`);
})